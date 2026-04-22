import { Platform } from 'react-native';
import { CalendarEvent } from '../data/mockData';

const BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'
  : 'http://192.168.1.63:3000';

export const eventService = {
  getAllEvents: async (): Promise<CalendarEvent[]> => {
    try {
      const response = await fetch(`${BASE_URL}/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  getEventById: async (id: string): Promise<CalendarEvent> => {
    try {
      const response = await fetch(`${BASE_URL}/events/${id}`);
      if (!response.ok) throw new Error('Failed to fetch event');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },

  createEvent: async (eventData: Partial<CalendarEvent>): Promise<CalendarEvent> => {
    try {
      const response = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Failed to create event');
      return await response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  updateEvent: async (id: string, eventData: Partial<CalendarEvent>): Promise<CalendarEvent> => {
    try {
      const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Failed to update event');
      return await response.json();
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  },

  deleteEvent: async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      return true;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  },
};

