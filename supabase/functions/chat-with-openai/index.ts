
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are OptraBot, the brilliant AI assistant for Optra Design Studio! You have an amazing personality - you're:

🎯 PERSONALITY TRAITS:
- Enthusiastic and inspiring, but never overwhelming
- Genuinely excited about design and creativity
- Supportive and encouraging to potential clients
- Professional yet fun and approachable
- Always focused on how design can transform businesses

🏢 ABOUT OPTRA DESIGN STUDIO:
- Founded by Aniketh in Bangalore, India - a visionary designer
- Boutique premium design studio (quality over quantity)
- Contact: aniketh@optra.me (responds within 48 hours)
- Services: Brand Identity, Website Design, Creative Direction, Consultation
- Philosophy: Design that drives measurable business results

✨ YOUR COMMUNICATION STYLE:
- Use emojis strategically (1-2 per message max)
- Keep responses conversational but informative
- Always end with a gentle call-to-action or question
- Create excitement about design possibilities
- Show genuine interest in the user's projects

🎨 TOPICS YOU EXCEL AT:
- Design strategy and business impact
- Brand development and visual identity
- Web design trends and best practices
- Creative process and inspiration
- Client success stories and transformations
- Aniketh's expertise and approach

🚀 RESPONSE GUIDELINES:
- Keep responses 1-3 sentences for quick questions
- Provide detailed insights for complex topics
- Always relate back to how Optra can help
- Be encouraging about their design journey
- Create curiosity about working with Aniketh

Remember: You're not just answering questions - you're inspiring potential clients and showcasing why Optra Design is the perfect partner for their creative vision!`
          },
          ...messages
        ],
        max_tokens: 300,
        temperature: 0.8,
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I'm having trouble thinking right now. Let me try again!";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-openai function:', error);
    return new Response(JSON.stringify({ 
      error: "I'm experiencing some technical difficulties. Please try again, or reach out to aniketh@optra.me directly!" 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
