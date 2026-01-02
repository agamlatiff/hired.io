import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Data Scientist",
  "Mobile Developer",
  "QA Engineer",
  "Engineering Manager"
];

const JOB_TYPES = ["Full-Time", "Part-Time", "Contract", "Remote", "Internship"];

async function main() {
  console.log("Start seeding jobs...");

  // 1. Get or Create a Company
  let company = await prisma.company.findFirst();

  if (!company) {
    console.log("No company found, creating one...");
    // Create a dummy user first to attach the company to
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: "password123",
      },
    });

    company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        email: faker.internet.email(),
        password: "password123",
        logo: faker.image.urlLoremFlickr({ category: 'business' }),
      },
    });
  }

  // 2. Get a CategoryJob (or create one)
  let category = await prisma.categoryJob.findFirst();
  if (!category) {
    category = await prisma.categoryJob.create({
      data: {
        name: "Software Engineering",
      },
    });
  }

  // 3. Generate Jobs
  console.log(`Creating jobs for company: ${company.name}`);

  for (let i = 0; i < 50; i++) {
    const role = faker.helpers.arrayElement(ROLES);
    const jobType = faker.helpers.arrayElement(JOB_TYPES);

    // Generate salary range based on role
    let baseSalary = 80000;
    if (role.includes("Manager")) baseSalary = 150000;
    if (role.includes("Senior")) baseSalary = 120000;
    if (role.includes("Intern")) baseSalary = 40000;

    // Add some randomness
    const minSalary = baseSalary + faker.number.int({ min: -10000, max: 20000 });
    const maxSalary = minSalary + faker.number.int({ min: 10000, max: 50000 });

    // @ts-ignore
    await prisma.job.create({
      data: {
        roles: role,
        jobType: jobType,
        salaryFrom: minSalary.toString(),
        salaryTo: maxSalary.toString(),
        description: faker.lorem.paragraphs(2),
        responsibility: faker.lorem.paragraphs(2),
        whoYouAre: faker.lorem.paragraph(),
        niceToHaves: faker.lorem.paragraph(),
        requiredSkills: [
          faker.helpers.arrayElement(["React", "Vue", "Angular"]),
          faker.helpers.arrayElement(["Node.js", "Python", "Go"]),
          "TypeScript",
          "SQL"
        ],
        benefits: [
          { benefit: "Health Insurance", description: "Full coverage" },
          { benefit: "Remote Work", description: "Work from anywhere" }
        ],
        companyId: company.id,
        categoryId: category.id,
        needs: 1,
        dueDate: faker.date.future(),
        datePosted: faker.date.recent(),
        status: "published",
        applicants: 0
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
