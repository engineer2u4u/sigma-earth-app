import { apiRequest } from "./queryClient";

export interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  author: number;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'author'?: Array<{
      name: string;
    }>;
  };
}

export interface SigmaEarthContent {
  courses: any[];
  jobs: any[];
  events: any[];
  news: WordPressPost[];
}

// WordPress REST API endpoints for Sigma Earth
const WP_API_BASE = 'https://sigmaearth.com/wp-json/wp/v2';

export async function fetchWordPressNews(): Promise<WordPressPost[]> {
  try {
    const response = await fetch(`${WP_API_BASE}/posts?_embed&per_page=10&orderby=date&order=desc`);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress news:', error);
    return [];
  }
}

export async function fetchCourses() {
  try {
    const response = await apiRequest('GET', '/api/courses');
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to load courses. Please check your connection and try again.');
  }
}

export async function fetchSigmaEarthCourses() {
  try {
    // Fetch real course data from the API that scrapes Sigma Earth
    const response = await apiRequest('GET', '/api/sigma-earth/courses');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Sigma Earth courses:', error);
    return [];
  }
}

export async function fetchJobs() {
  try {
    const response = await apiRequest('GET', '/api/jobs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to load job listings. Please check your connection and try again.');
  }
}

export async function fetchSigmaEarthJobs() {
  try {
    const response = await apiRequest('GET', '/api/sigma-earth/jobs');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Sigma Earth jobs:', error);
    return [];
  }
}

export async function fetchEcoListings() {
  try {
    const response = await apiRequest('GET', '/api/eco-listings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching eco listings:', error);
    throw new Error('Failed to load eco-friendly listings. Please check your connection and try again.');
  }
}

export async function fetchSigmaEarthEcoListings() {
  try {
    const response = await apiRequest('GET', '/api/sigma-earth/eco-listings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Sigma Earth eco listings:', error);
    return [];
  }
}

export async function fetchEvents() {
  try {
    const response = await apiRequest('GET', '/api/events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to load events. Please check your connection and try again.');
  }
}

export async function fetchSigmaEarthEvents() {
  try {
    const response = await apiRequest('GET', '/api/sigma-earth/events');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Sigma Earth events:', error);
    return [];
  }
}

export async function searchContent(query: string, category?: string) {
  try {
    const params = new URLSearchParams({ q: query });
    if (category) params.append('category', category);
    
    const response = await apiRequest('GET', `/api/search?${params.toString()}`);
    return await response.json();
  } catch (error) {
    console.error('Error searching content:', error);
    throw new Error('Search failed. Please try again.');
  }
}
