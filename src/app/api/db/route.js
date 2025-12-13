import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

async function ensureDb() {
  try {
    await fs.access(dbPath);
  } catch {
    const defaultData = {
      user: null,
      users: [],
      actions: [],
      claimedRewards: [],
      leaderboard: [],
      globalFeed: []
    };
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(dbPath, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    // If JSON is invalid, attempt to recover by reinitializing the DB
    const defaultData = {
      user: null,
      users: [],
      actions: [],
      claimedRewards: [],
      leaderboard: [],
      globalFeed: []
    };
    await writeDb(defaultData);
    return defaultData;
  }
}

async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const data = await readDb();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read db", details: String(err) }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const partial = await request.json();
    const current = await readDb();
    const merged = { ...current, ...partial };
    await writeDb(merged);
    return NextResponse.json(merged);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update db", details: String(err) }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";