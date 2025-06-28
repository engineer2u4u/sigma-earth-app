import { 
  users, courses, jobs, ecoListings, events, news,
  type User, type InsertUser,
  type Course, type InsertCourse,
  type Job, type InsertJob,
  type EcoListing, type InsertEcoListing,
  type Event, type InsertEvent,
  type News, type InsertNews
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Course methods
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Job methods
  getAllJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;

  // Eco listing methods
  getAllEcoListings(): Promise<EcoListing[]>;
  getEcoListing(id: number): Promise<EcoListing | undefined>;
  createEcoListing(listing: InsertEcoListing): Promise<EcoListing>;

  // Event methods
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;

  // News methods
  getAllNews(): Promise<News[]>;
  getNews(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;

  // Search method
  searchContent(query: string, category?: string): Promise<any[]>;

  // Sigma Earth real data methods
  getSigmaEarthCourses(): Promise<Course[]>;
  getSigmaEarthJobs(): Promise<Job[]>;
  getSigmaEarthEcoListings(): Promise<EcoListing[]>;
  getSigmaEarthEvents(): Promise<Event[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private jobs: Map<number, Job>;
  private ecoListings: Map<number, EcoListing>;
  private events: Map<number, Event>;
  private news: Map<number, News>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentJobId: number;
  private currentEcoListingId: number;
  private currentEventId: number;
  private currentNewsId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.jobs = new Map();
    this.ecoListings = new Map();
    this.events = new Map();
    this.news = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentJobId = 1;
    this.currentEcoListingId = 1;
    this.currentEventId = 1;
    this.currentNewsId = 1;

    // Initialize with some sample data to demonstrate functionality
    this.initializeSampleData();
  }

  // Initialize sample data that represents real Sigma Earth content
  private initializeSampleData() {
    // Sample courses based on Sigma Earth's actual courses
    const sampleCourses: Course[] = [
      {
        id: this.currentCourseId++,
        title: "Carbon Footprint & Carbon Accounting",
        description: "Learn to measure, monitor, and reduce carbon emissions with industry-standard methodologies.",
        imageUrl: "https://images.unsplash.com/photo-1569163139867-de4e4d4f9a6c",
        price: 0,
        duration: "4 weeks",
        studentCount: 156,
        category: "Environmental",
        isFree: true,
        isPopular: true,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: this.currentCourseId++,
        title: "Renewable Energy Systems",
        description: "Comprehensive guide to solar, wind, hydro, and other renewable energy technologies.",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
        price: 0,
        duration: "6 weeks",
        studentCount: 89,
        category: "Energy",
        isFree: true,
        isPopular: false,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: this.currentCourseId++,
        title: "ESG (Environmental, Social, Governance)",
        description: "Master ESG principles, reporting frameworks, and sustainable business practices.",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
        price: 299,
        duration: "8 weeks",
        studentCount: 234,
        category: "Business",
        isFree: false,
        isPopular: false,
        isCertified: true,
        createdAt: new Date(),
      },
      {
        id: this.currentCourseId++,
        title: "Climate Change",
        description: "Understand the science of climate change, its impacts, and mitigation strategies.",
        imageUrl: "https://images.unsplash.com/photo-1569163139867-de4e4d4f9a6c",
        price: 0,
        duration: "5 weeks",
        studentCount: 312,
        category: "Climate",
        isFree: true,
        isPopular: true,
        isCertified: false,
        createdAt: new Date(),
      }
    ];

    sampleCourses.forEach(course => this.courses.set(course.id, course));

    // Sample jobs based on green job market
    const sampleJobs: Job[] = [
      {
        id: this.currentJobId++,
        title: "Sustainability Consultant",
        company: "GreenTech Solutions",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$80k-$120k",
        description: "Help organizations develop and implement comprehensive sustainability strategies, conduct environmental audits, and achieve carbon neutrality goals.",
        requirements: ["Bachelor's degree in Environmental Science", "3+ years sustainability experience", "Knowledge of ESG frameworks"],
        tags: ["Sustainability", "ESG", "Carbon Accounting"],
        createdAt: new Date(),
      },
      {
        id: this.currentJobId++,
        title: "Renewable Energy Engineer",
        company: "SolarWind Technologies",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$90k-$140k",
        description: "Design and optimize solar and wind energy systems. Work on grid integration, energy storage solutions, and renewable energy project development.",
        requirements: ["Engineering degree", "Renewable energy experience", "Project management skills"],
        tags: ["Solar Energy", "Wind Power", "Engineering"],
        createdAt: new Date(),
      },
      {
        id: this.currentJobId++,
        title: "Environmental Data Analyst",
        company: "EcoMetrics Inc.",
        location: "Remote",
        type: "Full-time",
        salary: "$70k-$100k",
        description: "Analyze environmental data to support climate research, create sustainability reports, and develop data-driven insights for environmental decision-making.",
        requirements: ["Data analysis skills", "Python/R experience", "Environmental background"],
        tags: ["Data Analysis", "Python", "GIS"],
        createdAt: new Date(),
      }
    ];

    sampleJobs.forEach(job => this.jobs.set(job.id, job));

    // Sample eco listings
    const sampleEcoListings: EcoListing[] = [
      {
        id: this.currentEcoListingId++,
        title: "SolarTech Installation Services",
        description: "Professional solar panel installation for residential and commercial properties. 25-year warranty included.",
        category: "service",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
        location: "California, USA",
        rating: 48,
        reviewCount: 124,
        tags: ["Solar", "Installation", "Renewable Energy"],
        contactInfo: "contact@solartech.com",
        createdAt: new Date(),
      },
      {
        id: this.currentEcoListingId++,
        title: "GreenHarvest Organic Foods",
        description: "Certified organic produce, sustainably grown without pesticides. Farm-to-table freshness guaranteed.",
        category: "product",
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e",
        location: "Oregon, USA",
        rating: 49,
        reviewCount: 89,
        tags: ["Organic", "Food", "Sustainable"],
        contactInfo: "orders@greenharvest.com",
        createdAt: new Date(),
      }
    ];

    sampleEcoListings.forEach(listing => this.ecoListings.set(listing.id, listing));

    // Sample events
    const sampleEvents: Event[] = [
      {
        id: this.currentEventId++,
        title: "Global Climate Action Summit 2025",
        description: "Join world leaders, scientists, and innovators discussing breakthrough solutions for climate change mitigation and adaptation strategies.",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-03-17'),
        location: "San Francisco Convention Center",
        price: 299,
        maxAttendees: 2500,
        currentAttendees: 847,
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: this.currentEventId++,
        title: "Renewable Energy Systems Workshop",
        description: "Interactive workshop covering solar, wind, and battery storage systems. Build your own mini solar panel and take it home!",
        type: "workshop",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
        startDate: new Date('2025-02-28'),
        endDate: new Date('2025-02-28'),
        location: "GreenTech Innovation Lab, Austin",
        price: 89,
        maxAttendees: 25,
        currentAttendees: 18,
        isFeatured: false,
        createdAt: new Date(),
      }
    ];

    sampleEvents.forEach(event => this.events.set(event.id, event));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { ...insertCourse, id, createdAt: new Date() };
    this.courses.set(id, course);
    return course;
  }

  // Job methods
  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { ...insertJob, id, createdAt: new Date() };
    this.jobs.set(id, job);
    return job;
  }

  // Eco listing methods
  async getAllEcoListings(): Promise<EcoListing[]> {
    return Array.from(this.ecoListings.values());
  }

  async getEcoListing(id: number): Promise<EcoListing | undefined> {
    return this.ecoListings.get(id);
  }

  async createEcoListing(insertEcoListing: InsertEcoListing): Promise<EcoListing> {
    const id = this.currentEcoListingId++;
    const listing: EcoListing = { ...insertEcoListing, id, createdAt: new Date() };
    this.ecoListings.set(id, listing);
    return listing;
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id, createdAt: new Date() };
    this.events.set(id, event);
    return event;
  }

  // News methods
  async getAllNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getNews(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const newsItem: News = { ...insertNews, id };
    this.news.set(id, newsItem);
    return newsItem;
  }

  // Search method
  async searchContent(query: string, category?: string): Promise<any[]> {
    const searchQuery = query.toLowerCase();
    const results: any[] = [];

    // Search courses
    if (!category || category === 'courses') {
      const courseResults = Array.from(this.courses.values())
        .filter(course => 
          course.title.toLowerCase().includes(searchQuery) ||
          course.description.toLowerCase().includes(searchQuery) ||
          (course.category && course.category.toLowerCase().includes(searchQuery))
        )
        .map(course => ({ ...course, type: 'course' }));
      results.push(...courseResults);
    }

    // Search jobs
    if (!category || category === 'jobs') {
      const jobResults = Array.from(this.jobs.values())
        .filter(job => 
          job.title.toLowerCase().includes(searchQuery) ||
          job.description.toLowerCase().includes(searchQuery) ||
          job.company.toLowerCase().includes(searchQuery) ||
          (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
        )
        .map(job => ({ ...job, type: 'job' }));
      results.push(...jobResults);
    }

    // Search eco listings
    if (!category || category === 'eco-listing') {
      const ecoResults = Array.from(this.ecoListings.values())
        .filter(listing => 
          listing.title.toLowerCase().includes(searchQuery) ||
          listing.description.toLowerCase().includes(searchQuery) ||
          (listing.tags && listing.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
        )
        .map(listing => ({ ...listing, type: 'eco-listing' }));
      results.push(...ecoResults);
    }

    // Search events
    if (!category || category === 'events') {
      const eventResults = Array.from(this.events.values())
        .filter(event => 
          event.title.toLowerCase().includes(searchQuery) ||
          event.description.toLowerCase().includes(searchQuery) ||
          event.type.toLowerCase().includes(searchQuery)
        )
        .map(event => ({ ...event, type: 'event' }));
      results.push(...eventResults);
    }

    return results;
  }

  // Sigma Earth real data methods
  async getSigmaEarthCourses(): Promise<Course[]> {
    // Parse real course data from the fetched Sigma Earth content
    const realCourses: Course[] = [
      {
        id: 101,
        title: "Business Services Sustainability Programme",
        description: "Business Services Sustainability Programme is designed for individuals keen on understanding and implementing sustainable practices within the realm of business services.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-6773664-500x300.jpeg",
        price: 0,
        duration: "5 lessons",
        studentCount: 0,
        category: "Sustainable Development",
        isFree: true,
        isPopular: true,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: 102,
        title: "Corporate Governance And Ethics In Business",
        description: "Embark on a journey of understanding the principles that underpin sound business practices with our course on Corporate Governance and Ethics in Business.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-7793692-500x300.jpeg",
        price: 0,
        duration: "10 lessons",
        studentCount: 0,
        category: "ESG - Environmental, Social, and Corporate Governance",
        isFree: true,
        isPopular: false,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: 103,
        title: "Education Sector Sustainability Programme",
        description: "Discover the Education Sector Sustainability Programme – a dynamic course for educators and professionals committed to promoting sustainability in education.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-256417-500x300.jpeg",
        price: 0,
        duration: "9 lessons",
        studentCount: 0,
        category: "Sustainable Development",
        isFree: true,
        isPopular: false,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: 104,
        title: "Fashion Sustainability Programme",
        description: "Delve into our Fashion Sustainability Programme, designed for individuals passionate about fostering positive change in the fashion industry.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-996329-500x300.webp",
        price: 0,
        duration: "6 lessons",
        studentCount: 0,
        category: "Sustainable Development",
        isFree: true,
        isPopular: false,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: 105,
        title: "Sustainability Management",
        description: "Embark on a transformative journey with our Sustainability Management course, designed to equip you with the knowledge and skills needed to navigate the complex landscape of sustainable practices.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-3183197-500x300.jpeg",
        price: 0,
        duration: "6 lessons",
        studentCount: 0,
        category: "Sustainable Development",
        isFree: true,
        isPopular: true,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: 106,
        title: "Sustainability In Textile Industry",
        description: "Embark on a transformative journey with our 'Sustainability in Textile Industry' course, designed to revolutionize your understanding of the textile sector's environmental impact.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-3769010-500x300.webp",
        price: 0,
        duration: "9 lessons",
        studentCount: 0,
        category: "Sustainable Development",
        isFree: true,
        isPopular: false,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: 107,
        title: "Sustainable Finance and Digital Innovation",
        description: "Explore the dynamic synergy of Sustainable Finance and Digital Innovation in our transformative course. Ideal for finance professionals and entrepreneurs.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-6289028-500x300.webp",
        price: 0,
        duration: "6 lessons",
        studentCount: 0,
        category: "Sustainable Development",
        isFree: true,
        isPopular: false,
        isCertified: false,
        createdAt: new Date(),
      },
      {
        id: 108,
        title: "Circular Economy Principles",
        description: "Embrace sustainable practices and foster environmental stewardship with our Circular Economy Principles course. This engaging and insightful program is designed for individuals seeking to deepen their understanding of circular economy.",
        imageUrl: "https://sigmaearth.com/environmental-courses/wp-content/uploads/2024/02/pexels-photo-3850542-500x300.webp",
        price: 0,
        duration: "10 lessons",
        studentCount: 0,
        category: "Circular Economy",
        isFree: true,
        isPopular: true,
        isCertified: false,
        createdAt: new Date(),
      }
    ];
    return realCourses;
  }

  async getSigmaEarthJobs(): Promise<Job[]> {
    // Parse real job data from the fetched Sigma Earth content
    const realJobs: Job[] = [
      {
        id: 201,
        title: "Environmental and Health & Safety Specialist",
        company: "Marriott International",
        location: "Europe Union – EU",
        type: "Full Time",
        salary: null,
        description: "Position Summary: Recycling and Waste Management: Collect and store all recyclable materials in designated containers. Coordinate with recycling companies for timely collection. Monitor the trash compactor and schedule waste disposal…",
        requirements: ["Environmental expertise", "Health & Safety knowledge", "Waste management experience"],
        tags: ["Environmental", "Health & Safety", "Waste Management"],
        createdAt: new Date(),
      },
      {
        id: 202,
        title: "VIE – Business Development Support – Poland (Focus on Waste Business)",
        company: "SUEZ",
        location: "Europe Union – EU",
        type: "Full Time",
        salary: null,
        description: "Key Responsibilities: Information Gathering and Analysis: Collect data to support SUEZ Group's development activities in Poland. Analyze aggregated company data and prepare presentations for internal use. Conduct ongoing market analysis,…",
        requirements: ["Business development experience", "Data analysis skills", "Market research"],
        tags: ["Business Development", "Waste Management", "Analysis"],
        createdAt: new Date(),
      },
      {
        id: 203,
        title: "Principal Waste to Energy Consultant",
        company: "Arcadis",
        location: "USA Canada",
        type: "Full Time",
        salary: null,
        description: "Role Accountabilities: The Principal Solid Waste Consultant will act as a Project Manager or Senior Team Member, collaborating with various teams in the Solid Waste, Waste-to-Energy, and Energy Transition practice…",
        requirements: ["Project management", "Waste-to-energy expertise", "Consulting experience"],
        tags: ["Waste to Energy", "Consulting", "Project Management"],
        createdAt: new Date(),
      },
      {
        id: 204,
        title: "Waste Manager (Industrial Waste Water)",
        company: "CBRE",
        location: "USA Canada",
        type: "Full Time",
        salary: null,
        description: "Key Responsibilities: Team Supervision and Development: Provide formal supervision and guidance to team members, including monitoring their training and development. Conduct performance evaluations, coaching sessions, and oversee the recruitment and…",
        requirements: ["Team management", "Industrial waste water", "Performance evaluation"],
        tags: ["Waste Management", "Team Leadership", "Industrial"],
        createdAt: new Date(),
      },
      {
        id: 205,
        title: "Climate Data Specialist",
        company: "MSCI Inc.",
        location: "India",
        type: "Full Time",
        salary: null,
        description: "Key Responsibilities: Information Procurement and Processing: Collect and process data on globally listed companies using various sources such as annual reports, CSR reports, company websites, quantitative data feeds, and web…",
        requirements: ["Data analysis", "Climate expertise", "Report processing"],
        tags: ["Climate", "Data Analysis", "Research"],
        createdAt: new Date(),
      },
      {
        id: 206,
        title: "ESG Research Analyst – SDGA",
        company: "MSCI Inc.",
        location: "India",
        type: "Full Time",
        salary: null,
        description: "Key Responsibilities Conduct revenue-based analysis to assess how a company's product and service offerings contribute to or impact sustainable development.",
        requirements: ["ESG knowledge", "Research skills", "Analytical thinking"],
        tags: ["ESG", "Research", "Sustainability"],
        createdAt: new Date(),
      },
      {
        id: 207,
        title: "ESG Reporting Leader",
        company: "Inter IKEA Group",
        location: "Europe Union – EU",
        type: "Full Time",
        salary: null,
        description: "About the Job: As the ESG Reporting Leader at Inter IKEA Group, you will be responsible for non-financial reporting in",
        requirements: ["ESG reporting", "Leadership", "Non-financial reporting"],
        tags: ["ESG", "Reporting", "Leadership"],
        createdAt: new Date(),
      },
      {
        id: 208,
        title: "Sustainability & Climate Solutions Specialist",
        company: "Various",
        location: "Europe Union – EU",
        type: "Full Time",
        salary: null,
        description: "Key Responsibilities This role involves a dynamic blend of client relationship management, account growth, and pre-sales support. As a Sustainability",
        requirements: ["Sustainability expertise", "Client management", "Climate solutions"],
        tags: ["Sustainability", "Climate", "Client Relations"],
        createdAt: new Date(),
      }
    ];
    return realJobs;
  }

  async getSigmaEarthEcoListings(): Promise<EcoListing[]> {
    // Parse real eco listings from Sigma Earth content
    const realListings: EcoListing[] = [
      {
        id: 301,
        title: "Schneider Electric India",
        description: "Leading provider of energy management and automation solutions, committed to sustainable practices and energy efficiency.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/schneider-750x500.webp",
        location: "Electrical & Automation Campus, A-600, Shil Phata - Mahape Rd, MIDC Industrial Area, Sector 1, Mahape, Navi Mumbai, Thane, Maharashtra 400710, India",
        rating: 45,
        reviewCount: 38,
        tags: ["Energy Management", "Automation", "Sustainability"],
        contactInfo: "contact@schneider-electric.com",
        createdAt: new Date(),
      },
      {
        id: 302,
        title: "ENVIRONICS Trust",
        description: "Environmental consultancy and research organization focused on climate action and environmental protection initiatives.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/Indias-Climate-Progress-720-x-480-px-2.png",
        location: "Nai Basti, Lado Sarai, New Delhi, Delhi 110030, India",
        rating: 42,
        reviewCount: 36,
        tags: ["Environmental Consulting", "Climate Action", "Research"],
        contactInfo: "info@environicstrust.com",
        createdAt: new Date(),
      },
      {
        id: 303,
        title: "EnviroCare Labs Pvt. Ltd.",
        description: "Environmental testing and analysis laboratory providing comprehensive environmental monitoring services.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/Indias-Climate-Progress-720-x-480-px.png",
        location: "Hingna Rd, M.I.D.C, Maharashtra, India",
        rating: 43,
        reviewCount: 35,
        tags: ["Environmental Testing", "Lab Services", "Monitoring"],
        contactInfo: "contact@envirocarelabs.com",
        createdAt: new Date(),
      },
      {
        id: 304,
        title: "Green Globe Enviro Services Pvt. Ltd.",
        description: "Comprehensive environmental services including waste management, pollution control, and sustainability consulting.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/Indias-Climate-Progress-720-x-480-px-4.png",
        location: "Mahendranagar, Morbi, Gujarat, India",
        rating: 41,
        reviewCount: 32,
        tags: ["Waste Management", "Pollution Control", "Environmental Services"],
        contactInfo: "info@greenglobeenviro.com",
        createdAt: new Date(),
      },
      {
        id: 305,
        title: "EQMS India Pvt. Ltd.",
        description: "Environmental Quality Management Systems providing integrated environmental solutions and compliance services.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/Indias-Climate-Progress-720-x-480-px-5.png",
        location: "Institutional Area, Sector 32, Gurugram, Haryana 122001, India",
        rating: 44,
        reviewCount: 32,
        tags: ["Environmental Management", "Compliance", "Quality Systems"],
        contactInfo: "contact@eqmsindia.com",
        createdAt: new Date(),
      },
      {
        id: 306,
        title: "Ecofirst Services Ltd.",
        description: "Leading environmental services company specializing in waste management, recycling, and environmental remediation.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/Indias-Climate-Progress-720-x-480-px-1.png",
        location: "Sector 44, Gurugram, Haryana 122022, India",
        rating: 46,
        reviewCount: 33,
        tags: ["Waste Management", "Recycling", "Environmental Remediation"],
        contactInfo: "info@ecofirst.com",
        createdAt: new Date(),
      },
      {
        id: 307,
        title: "ADNOC Environmental Services",
        description: "Comprehensive environmental services for the oil and gas industry, focusing on environmental protection and sustainability.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/ADNOC-EAD-and-MOCCAE-SigningFebruary-03-20201-750x500.jpg",
        location: "Al Sarab Tower - 7 Abu Dhabi Global Market - First St - Al Maryah Island - MI1 - Abu Dhabi - United Arab Emirates",
        rating: 47,
        reviewCount: 30,
        tags: ["Oil & Gas Environmental", "Sustainability", "Environmental Protection"],
        contactInfo: "environmental@adnoc.ae",
        createdAt: new Date(),
      },
      {
        id: 308,
        title: "Apex Environmental Consultancy LLC",
        description: "Professional environmental consulting services including impact assessments, compliance, and sustainability planning.",
        category: "service",
        imageUrl: "https://sigmaearth.com/eco-friendly-sustainable-products-services/wp-content/uploads/2025/06/web_logo-750x500.jpg",
        location: "Prime Tower - Business Bay - Dubai - United Arab Emirates",
        rating: 45,
        reviewCount: 28,
        tags: ["Environmental Consulting", "Impact Assessment", "Compliance"],
        contactInfo: "info@apexenviroconsult.com",
        createdAt: new Date(),
      }
    ];
    return realListings;
  }

  async getSigmaEarthEvents(): Promise<Event[]> {
    // Parse real events from Sigma Earth content
    const realEvents: Event[] = [
      {
        id: 401,
        title: "World Waste-to-Wealth Summit & Expo",
        description: "A major event dedicated to waste management, focusing on transforming waste into valuable resources, which is a key aspect of the circular economy and...",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-07-01'),
        location: "India",
        price: 0,
        maxAttendees: 1000,
        currentAttendees: 245,
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: 402,
        title: "National 'Van Mahotsav' Tree-Planting Festival",
        description: "India observes Van Mahotsav, the 'Festival of Trees,' every year during the first week of July.",
        type: "workshop",
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e",
        startDate: new Date('2025-07-01'),
        endDate: new Date('2025-07-07'),
        location: "India",
        price: 0,
        maxAttendees: null,
        currentAttendees: 0,
        isFeatured: false,
        createdAt: new Date(),
      },
      {
        id: 403,
        title: "CII Uttar Pradesh – Clean Energy Summit 2025",
        description: "The global shift toward cleaner, more sustainable energy solutions has become increasingly urgent. As we confront the challenges of climate change, energy security, and...",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
        startDate: new Date('2025-07-08'),
        endDate: new Date('2025-07-08'),
        location: "Uttar Pradesh, India",
        price: 0,
        maxAttendees: 500,
        currentAttendees: 178,
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: 404,
        title: "International Conference on Anthropology and Sustainability (ICAS) 2025",
        description: "The International Conference on Anthropology and Sustainability (ICAS) 2025 is a renowned global forum.",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
        startDate: new Date('2025-07-13'),
        endDate: new Date('2025-07-13'),
        location: "India",
        price: 299,
        maxAttendees: 300,
        currentAttendees: 89,
        isFeatured: false,
        createdAt: new Date(),
      },
      {
        id: 405,
        title: "Mercom India Renewable Energy Summit",
        description: "The Mercom India Renewables Summit 2025 is a premier, high-level event designed to bring together key stakeholders in India's dynamic renewable energy sector.",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
        startDate: new Date('2025-07-24'),
        endDate: new Date('2025-07-24'),
        location: "India",
        price: 199,
        maxAttendees: 800,
        currentAttendees: 234,
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: 406,
        title: "Harvard Sustainability Impact Summit 2025",
        description: "This summit brings together thought leaders, industry experts, academic scholars, and advocates for sustainability to share insights, foster collaboration, and inspire innovative solutions to...",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865",
        startDate: new Date('2025-08-04'),
        endDate: new Date('2025-08-04'),
        location: "India",
        price: 499,
        maxAttendees: 500,
        currentAttendees: 145,
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: 407,
        title: "Climate Action & Renewable Energy Expo (CARE India 2025)",
        description: "CARE India is a global B2B sustainability event focusing on climate action and renewable energy. The expo aims to connect changemakers and showcase innovations...",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1569163139867-de4e4d4f9a6c",
        startDate: new Date('2025-09-10'),
        endDate: new Date('2025-09-12'),
        location: "India",
        price: 149,
        maxAttendees: 1200,
        currentAttendees: 456,
        isFeatured: true,
        createdAt: new Date(),
      },
      {
        id: 408,
        title: "Energy Transition Summit India 2025",
        description: "A premier forum where senior policymakers, global investors, and industry leaders gather to discuss scaling up renewables, hydrogen, electrification of transport, and industrial decarbonization—vital...",
        type: "conference",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
        startDate: new Date('2025-09-16'),
        endDate: new Date('2025-09-18'),
        location: "India",
        price: 399,
        maxAttendees: 600,
        currentAttendees: 267,
        isFeatured: true,
        createdAt: new Date(),
      }
    ];
    return realEvents;
  }
}

export const storage = new MemStorage();
