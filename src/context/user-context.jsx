"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { userSummary as mockUser, recentActions as mockActions, leaderboard as mockLeaderboard } from "@/lib/mockData";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [actions, setActions] = useState([]);
    const [claimedRewards, setClaimedRewards] = useState([]);
    const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
    const [globalFeed, setGlobalFeed] = useState(mockActions);

    // Load from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("hb_user");
        const storedActions = localStorage.getItem("hb_actions");
        const storedRewards = localStorage.getItem("hb_rewards");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedActions) {
            setActions(JSON.parse(storedActions));
        }

        if (storedRewards) {
            setClaimedRewards(JSON.parse(storedRewards));
        }
    }, []);

    // Persist to local storage
    useEffect(() => {
        if (user) localStorage.setItem("hb_user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("hb_actions", JSON.stringify(actions));
    }, [actions]);

    useEffect(() => {
        localStorage.setItem("hb_rewards", JSON.stringify(claimedRewards));
    }, [claimedRewards]);

    // Derived effect: Sync User into Leaderboard whenever user stats change
    useEffect(() => {
        if (!user) return;

        setLeaderboard((prevLeaderboard) => {
            // Check if user is already in the leaderboard
            const userIndex = prevLeaderboard.findIndex((entry) => entry.id === user.id);
            let newLeaderboard = [...prevLeaderboard];

            const userEntry = {
                id: user.id,
                name: user.name,
                avatarColor: "bg-emerald-500", // Default color for user
                city: user.city,
                gbits: user.gbitsTotal,
                streakDays: user.streakDays,
                isCurrentUser: true, // Marker to highlight in UI
            };

            if (userIndex !== -1) {
                // Update existing
                newLeaderboard[userIndex] = userEntry;
            } else {
                // Add new
                newLeaderboard.push(userEntry);
            }

            // Sort by Gbits descending
            return newLeaderboard.sort((a, b) => b.gbits - a.gbits);
        });
    }, [user]);

    const login = (name, city) => {
        const newUser = {
            ...mockUser,
            name,
            city,
            gbitsTotal: 100, // content start bonus
            gbitsThisWeek: 0,
            streakDays: 1,
        };
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("hb_user");
        // For a demo, clearing local history might be better to reset state.
        localStorage.removeItem("hb_actions");
        localStorage.removeItem("hb_rewards");
        setActions([]);
        setClaimedRewards([]);
        // Reset leaderboard to mock only (remove user)
        setLeaderboard(mockLeaderboard);
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
            location: user.city,
            date: new Date().toISOString(),
            gbits: amount,
            verification,
        };
        setActions((prev) => [newAction, ...prev]);

        // Log action (Global Feed)
        const globalAction = {
            ...newAction,
            user: user.name, // Attach username for feed
            verification: "Live Verified",
        };
        setGlobalFeed((prev) => [globalAction, ...prev]);
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
        setClaimedRewards((prev) => [
            ...prev,
            { ...reward, claimedAt: new Date().toISOString() },
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
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
