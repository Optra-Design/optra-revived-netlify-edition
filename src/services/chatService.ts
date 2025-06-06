import { supabase } from '../integrations/supabase/client';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  reply: string;
  success: boolean;
  error?: string;
}

class ChatService {
  private conversationHistory: ChatMessage[] = [];

  async sendMessage(userMessage: string): Promise<ChatResponse> {
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Keep conversation manageable (last 10 messages)
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-8);
      }

      // Call our Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-openai', {
        body: { messages: this.conversationHistory }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return this.getFallbackResponse(userMessage);
      }

      if (data?.reply) {
        // Add assistant response to history
        this.conversationHistory.push({
          role: 'assistant',
          content: data.reply
        });

        return {
          reply: data.reply,
          success: true
        };
      } else {
        return this.getFallbackResponse(userMessage);
      }
    } catch (error) {
      console.error('Chat service error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): ChatResponse {
    const message = userMessage.toLowerCase();
    
    const fallbackResponses = {
      aniketh: "Aniketh is the creative genius behind Optra! 🎨 Based in Bangalore, he personally crafts each project with meticulous attention to detail. Want to connect with him? Drop a line at aniketh@optra.me!",
      services: "Optra transforms businesses through: ✨ Brand Identity Design, 🌐 Interactive Web Experiences, 🎯 Creative Direction, and 💡 Strategic Consultation. Which service interests you most?",
      contact: "Ready to create something extraordinary? 🚀 Reach Aniketh at aniketh@optra.me - he responds within 48 hours with personalized insights for your project!",
      default: "I'm experiencing some connection issues, but I'm still here to help! 💫 For the best experience, you can always reach Aniketh directly at aniketh@optra.me. What would you like to know about Optra?"
    };

    for (const [key, response] of Object.entries(fallbackResponses)) {
      if (key !== 'default' && message.includes(key)) {
        return { reply: response, success: true };
      }
    }

    return { reply: fallbackResponses.default, success: true };
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}

export const chatService = new ChatService();
