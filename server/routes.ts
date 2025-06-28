import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Courses endpoints
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ error: "Failed to fetch course" });
    }
  });

  // Jobs endpoints
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getAllJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJob(id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  // Eco listings endpoints
  app.get("/api/eco-listings", async (req, res) => {
    try {
      const listings = await storage.getAllEcoListings();
      res.json(listings);
    } catch (error) {
      console.error("Error fetching eco listings:", error);
      res.status(500).json({ error: "Failed to fetch eco listings" });
    }
  });

  app.get("/api/eco-listings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const listing = await storage.getEcoListing(id);
      if (!listing) {
        return res.status(404).json({ error: "Eco listing not found" });
      }
      res.json(listing);
    } catch (error) {
      console.error("Error fetching eco listing:", error);
      res.status(500).json({ error: "Failed to fetch eco listing" });
    }
  });

  // Events endpoints
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ error: "Failed to fetch event" });
    }
  });

  // Search endpoint
  app.get("/api/search", async (req, res) => {
    try {
      const { q: query, category } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }

      const results = await storage.searchContent(query, category as string);
      res.json(results);
    } catch (error) {
      console.error("Error searching content:", error);
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Sigma Earth real data endpoints
  app.get("/api/sigma-earth/courses", async (req, res) => {
    try {
      const realCourses = await storage.getSigmaEarthCourses();
      res.json(realCourses);
    } catch (error) {
      console.error("Error fetching Sigma Earth courses:", error);
      res.status(500).json({ error: "Failed to fetch Sigma Earth courses" });
    }
  });

  app.get("/api/sigma-earth/jobs", async (req, res) => {
    try {
      const realJobs = await storage.getSigmaEarthJobs();
      res.json(realJobs);
    } catch (error) {
      console.error("Error fetching Sigma Earth jobs:", error);
      res.status(500).json({ error: "Failed to fetch Sigma Earth jobs" });
    }
  });

  app.get("/api/sigma-earth/eco-listings", async (req, res) => {
    try {
      const realListings = await storage.getSigmaEarthEcoListings();
      res.json(realListings);
    } catch (error) {
      console.error("Error fetching Sigma Earth eco listings:", error);
      res.status(500).json({ error: "Failed to fetch Sigma Earth eco listings" });
    }
  });

  app.get("/api/sigma-earth/events", async (req, res) => {
    try {
      const realEvents = await storage.getSigmaEarthEvents();
      res.json(realEvents);
    } catch (error) {
      console.error("Error fetching Sigma Earth events:", error);
      res.status(500).json({ error: "Failed to fetch Sigma Earth events" });
    }
  });

  // Course enrollment endpoint
  app.post("/api/courses/:id/enroll", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      // TODO: Implement user authentication and enrollment logic
      res.json({ message: "Enrollment successful", courseId });
    } catch (error) {
      console.error("Error enrolling in course:", error);
      res.status(500).json({ error: "Enrollment failed" });
    }
  });

  // Job application endpoint
  app.post("/api/jobs/:id/apply", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      // TODO: Implement user authentication and application logic
      res.json({ message: "Application submitted successfully", jobId });
    } catch (error) {
      console.error("Error applying to job:", error);
      res.status(500).json({ error: "Application failed" });
    }
  });

  // Event registration endpoint
  app.post("/api/events/:id/register", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      // TODO: Implement user authentication and registration logic
      res.json({ message: "Registration successful", eventId });
    } catch (error) {
      console.error("Error registering for event:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
