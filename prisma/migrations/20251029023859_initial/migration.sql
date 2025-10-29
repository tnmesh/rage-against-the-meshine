-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "longName" TEXT NOT NULL,
    "discordId" TEXT
);

-- CreateTable
CREATE TABLE "NodeInfo" (
    "nodeId" TEXT NOT NULL PRIMARY KEY,
    "hopStart" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "NodeInfo_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
