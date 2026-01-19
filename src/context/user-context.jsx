"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [actions, setActions] = useState([]);
    const [claimedRewards, setClaimedRewards] = useState([]);
    const [users, setUsers] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [globalFeed, setGlobalFeed] = useState([]);
    const [activeQuests, setActiveQuests] = useState([]);
    const initializedRef = useRef(false);

    const persist = async (partial) => {
        try {
            await fetch("/api/db", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(partial),
            });
        } catch (e) {
            // In demo mode, ignore persistence errors
        }
    };

    // Load from server-side JSON db on mount
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/db");
                const data = await res.json();
                if (Array.isArray(data.users)) setUsers(data.users);
                if (data.user) {
                    setUser(data.user);
                    const existing = (data.users || []).find(u => u.id === data.user.id);
                    if (existing) {
                        if (Array.isArray(existing.actions)) setActions(existing.actions);
                        if (Array.isArray(existing.claimedRewards)) setClaimedRewards(existing.claimedRewards);
                    } else {
                        if (Array.isArray(data.actions)) setActions(data.actions);
                        if (Array.isArray(data.claimedRewards)) setClaimedRewards(data.claimedRewards);
                    }
                } else {
                    if (Array.isArray(data.actions)) setActions(data.actions);
                    if (Array.isArray(data.claimedRewards)) setClaimedRewards(data.claimedRewards);
                }
                if (Array.isArray(data.leaderboard)) setLeaderboard(data.leaderboard);
                if (Array.isArray(data.globalFeed)) setGlobalFeed(data.globalFeed);
            } catch (e) {
                // If API fails, keep current in-memory state
            } finally {
                initializedRef.current = true;
            }
        };
        load();
    }, []);

    // Live polling to keep leaderboard and globalFeed updated
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch("/api/db");
                const data = await res.json();
                if (Array.isArray(data.leaderboard)) setLeaderboard(data.leaderboard);
                if (Array.isArray(data.globalFeed)) setGlobalFeed(data.globalFeed);
                if (Array.isArray(data.users)) setUsers(data.users);
            } catch (e) {
                // ignore polling errors
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Persist changes to server-side JSON db (normalize and upsert by id or name+city)
    useEffect(() => {
        if (!initializedRef.current) return;
        if (!user) {
            persist({ user: null });
            return;
        }
        const norm = (s) => (s || "").trim().toLowerCase();
        const normalizedUser = {
            ...user,
            name: (user.name || "").trim(),
            city: (user.city || "").trim(),
        };
        // Upsert user in users list (match by id OR normalized name+city)
        setUsers((prev) => {
            const idx = prev.findIndex(
                (u) => u.id === user.id || (norm(u.name) === norm(user.name) && norm(u.city) === norm(user.city))
            );
            const updatedUser = { ...normalizedUser, actions, claimedRewards };
            let next = [...prev];
            if (idx !== -1) next[idx] = { ...next[idx], ...updatedUser };
            else next.push(updatedUser);
            persist({ users: next, user: updatedUser });
            return next;
        });
    }, [user, actions, claimedRewards]);

    // Derived effect: Sync user into Leaderboard and persist with rank + rewards
    useEffect(() => {
        if (!user) return;

        setLeaderboard((prevLeaderboard) => {
            const userIndex = prevLeaderboard.findIndex((entry) => entry.id === user.id);
            let newLeaderboard = [...prevLeaderboard];

            const userEntry = {
                id: user.id,
                name: (user.name || "").trim(),
                avatarColor: "bg-emerald-500",
                city: (user.city || "").trim(),
                gbits: user.gbitsTotal,
                streakDays: user.streakDays,
                isCurrentUser: true,
                rewardsClaimed: claimedRewards.length || 0,
            };

            if (userIndex !== -1) {
                newLeaderboard[userIndex] = userEntry;
            } else {
                newLeaderboard.push(userEntry);
            }

            // Sort by Gbits and assign rank
            newLeaderboard.sort((a, b) => b.gbits - a.gbits);
            newLeaderboard = newLeaderboard.map((entry, idx) => ({ ...entry, rank: idx + 1 }));

            // Persist leaderboard
            persist({ leaderboard: newLeaderboard });
            return newLeaderboard;
        });
    }, [user, claimedRewards]);

    // Helper to hash passwords (SHA-256)
    const sha256 = async (text) => {
        const enc = new TextEncoder();
        const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
        const arr = Array.from(new Uint8Array(buf));
        return arr.map((b) => b.toString(16).padStart(2, "0")).join("");
    };

    // Generate a user-friendly redeem code (client-side)
    const generateRedeemCode = (length = 8) => {
        const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // avoid confusing characters
        const arr = new Uint8Array(length);
        try {
            crypto.getRandomValues(arr);
        } catch (e) {
            // Fallback to Math.random if crypto unavailable
            for (let i = 0; i < length; i++) arr[i] = Math.floor(Math.random() * 256);
        }
        return Array.from(arr).map((n) => chars[n % chars.length]).join('');
    };

    const login = async (email, password) => {
        const norm = (s) => (s || "").trim().toLowerCase();
        let latestUsers = users;
        try {
            const res = await fetch("/api/db");
            const data = await res.json();
            if (Array.isArray(data.users)) {
                latestUsers = data.users;
                setUsers(data.users);
            }
        } catch (e) {
            // ignore; fall back to current users state
        }

        const userByEmail = latestUsers.find((u) => norm(u.email) === norm(email));
        if (!userByEmail) {
            return { success: false, message: "No account found. Please sign up first." };
        }

        const hash = await sha256(password);
        if (userByEmail.passwordHash !== hash) {
            return { success: false, message: "Incorrect password." };
        }

        const cleanExisting = {
            ...userByEmail,
            name: (userByEmail.name || "").trim(),
            city: (userByEmail.city || "").trim(),
            email: (userByEmail.email || "").trim(),
        };
        setUser(cleanExisting);
        setActions(Array.isArray(userByEmail.actions) ? userByEmail.actions : []);
        setClaimedRewards(Array.isArray(userByEmail.claimedRewards) ? userByEmail.claimedRewards : []);
        persist({ user: cleanExisting });
        return { success: true };
    };

    const signup = async ({ name, city, email, password }) => {
        const norm = (s) => (s || "").trim().toLowerCase();
        const trimmed = {
            name: (name || "").trim(),
            city: (city || "").trim(),
            email: (email || "").trim(),
        };
        // refresh latest users list
        let latest = users;
        try {
            const res = await fetch("/api/db");
            const data = await res.json();
            if (Array.isArray(data.users)) latest = data.users;
        } catch { }
        const exists = latest.find((u) => norm(u.email) === norm(trimmed.email));
        if (exists) return { success: false, message: "Email already registered. Please log in." };
        const passwordHash = await sha256(password || "");
        const newUser = {
            id: `user-${Date.now()}`,
            ...trimmed,
            passwordHash,
            gbitsTotal: 0,
            gbitsThisWeek: 0,
            streakDays: 0,
            level: 1,
            nextLevelAt: 1000,
            treesPlanted: 0,
            smartBinDrops: 0,
            actions: [],
            claimedRewards: [],
        };
        const nextUsers = [...latest, newUser];
        setUsers(nextUsers);
        // Do not auto-login; require explicit login after signup
        persist({ users: nextUsers });
        return { success: true, message: "Signed up successfully. Please log in." };
    };

    const logout = () => {
        setUser(null);
        setActions([]);
        setClaimedRewards([]);
        // Do not reset leaderboard; leave persisted state intact
        // Persist pointer only; keep user history in users[]
        persist({ user: null });
    };

    const addGbits = (amount, description, type, verification = "App Log") => {
        if (!user) return;

        // Update user balance
        setUser((prev) => ({
            ...prev,
            gbitsTotal: prev.gbitsTotal + amount,
            gbitsThisWeek: prev.gbitsThisWeek + amount,
        }));

        // Log action (Personal)
        const newAction = {
            id: `action-${Date.now()}`,
            type,
            description,
            location: (user.city || "").trim(),
            date: new Date().toISOString(),
            gbits: amount,
            verification,
        };
        setActions((prev) => [newAction, ...prev]);

        // Log action (Global Feed)
        const globalAction = {
            ...newAction,
            user: (user.name || "").trim(), // Attach username for feed
            verification: "Live Verified",
        };
        setGlobalFeed((prev) => {
            const updated = [globalAction, ...prev];
            persist({ globalFeed: updated });
            return updated;
        });
    };

    const claimReward = (reward) => {
        if (!user) return { success: false, message: "Not logged in" };
        if (user.gbitsTotal < reward.cost) {
            return { success: false, message: "Insufficient Gbits" };
        }

        // Deduct points
        setUser((prev) => ({
            ...prev,
            gbitsTotal: prev.gbitsTotal - reward.cost,
        }));

        // Add to claimed
        const redeemCode = generateRedeemCode(10);
        setClaimedRewards((prev) => [
            ...prev,
            { ...reward, claimedAt: new Date().toISOString(), redeemCode },
        ]);

        return { success: true, message: `Redeemed ${reward.title} for ${reward.cost} GB` };
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                actions,
                claimedRewards,
                leaderboard,
                globalFeed,
                login,
                logout,
                addGbits,
                claimReward,
                signup,
                activeQuests,
                setActiveQuests,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
