import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  try {
    console.log("--- START CHECK ---");

    const totalJobs = await prisma.job.count();
    console.log(`Total Jobs in DB: ${totalJobs}`);

    const publishedJobs = await prisma.job.count({
      where: { status: "published" }
    });
    console.log(`Published Jobs in DB: ${publishedJobs}`);

    if (publishedJobs > 0) {
      const firstJob = await prisma.job.findFirst({
        where: { status: "published" },
        select: { id: true, roles: true, salaryFrom: true, salaryTo: true, status: true }
      });
      console.log("Sample Job:", JSON.stringify(firstJob, null, 2));
    } else {
      console.log("No published jobs found!");
    }

    console.log("--- END CHECK ---");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
