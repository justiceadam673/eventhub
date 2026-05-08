import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MessageSquare,
  Send,
  Bell,
  HeartHandshake,
  CalendarDays,
  Clock3,
  User,
} from "lucide-react";

const conversationThreads = [
  {
    id: 1,
    name: "Luxe Events",
    lastMessage: "Absolutely, we can add the signature cake!",
    time: "2m ago",
    unread: 3,
    role: "Vendor",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Sparkle Music",
    lastMessage: "Your playlist is ready for review.",
    time: "14m ago",
    unread: 0,
    role: "Vendor",
    avatar: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    name: "Bella Beauty",
    lastMessage: "See you at the venue at 3pm.",
    time: "1h ago",
    unread: 1,
    role: "Vendor",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 4,
    name: "Event Harmony",
    lastMessage: "I will send the updated quote today.",
    time: "Yesterday",
    unread: 0,
    role: "Vendor",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
  },
];

const messagesData = {
  1: [
    {
      id: 1,
      author: "vendor",
      text: "Hi Sarah! Your venue choice is beautiful. We can finalize the menu and send the tasting notes by tomorrow.",
      time: "09:12 AM",
    },
    {
      id: 2,
      author: "me",
      text: "Amazing! Please include the vegan option and a signature dessert.",
      time: "09:15 AM",
    },
    {
      id: 3,
      author: "vendor",
      text: "Great. I’ll add the rose champagne toast and confirm the cake design.",
      time: "09:18 AM",
    },
  ],
  2: [
    {
      id: 4,
      author: "vendor",
      text: "We have a few new DJ mixes that would match your theme perfectly.",
      time: "08:40 AM",
    },
    {
      id: 5,
      author: "me",
      text: "Send them over and I’ll pick my favorites.",
      time: "08:43 AM",
    },
  ],
};

const Messages = () => {
  const [activeThread, setActiveThread] = useState(1);
  const [messageText, setMessageText] = useState("");

  const activeMessages = messagesData[activeThread] || [];
  const activeThreadData = conversationThreads.find((thread) => thread.id === activeThread);

  return (
    <div className='min-h-screen bg-[#f7f4ff] font-sans text-gray-900 relative overflow-hidden'>
      <div className='absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-purple-300/30 blur-[120px] pointer-events-none' />
      <div className='absolute -bottom-32 left-0 w-[520px] h-[520px] rounded-full bg-pink-200/30 blur-[140px] pointer-events-none' />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 p-8 shadow-[0_40px_120px_rgba(99,102,241,0.18)]'
        >
          <div className='absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_35%)]' />
          <div className='relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center'>
            <div>
              <p className='text-sm uppercase tracking-[0.35em] text-white/80 font-semibold'>Client Messaging</p>
              <h1 className='mt-4 text-4xl md:text-5xl font-black text-white tracking-tight'>Stay in sync with every vendor.</h1>
              <p className='mt-4 max-w-xl text-white/85 text-base md:text-lg leading-8'>Communicate effortlessly with your event partners, track updates, and keep every detail organized inside a smart conversation dashboard.</p>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-[1.75rem] bg-white/10 border border-white/20 p-5 backdrop-blur-xl'>
                <div className='flex items-center gap-3 text-white'>
                  <Bell className='w-5 h-5' />
                  <span className='font-semibold'>Fast replies</span>
                </div>
                <p className='mt-3 text-sm text-white/80'>Respond to vendor messages before the next planning checkpoint.</p>
              </div>
              <div className='rounded-[1.75rem] bg-white/10 border border-white/20 p-5 backdrop-blur-xl'>
                <div className='flex items-center gap-3 text-white'>
                  <HeartHandshake className='w-5 h-5' />
                  <span className='font-semibold'>Trusted vendors</span>
                </div>
                <p className='mt-3 text-sm text-white/80'>All your conversations are grouped with trusted professionals you already love.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className='mt-10 grid gap-8 xl:grid-cols-[360px_1fr]'>
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className='rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl overflow-hidden'
          >
            <div className='flex items-center justify-between gap-4 p-6 border-b border-gray-200/70'>
              <div>
                <h2 className='text-lg font-black text-slate-900'>Conversations</h2>
                <p className='text-sm text-slate-500'>Recent vendor chats</p>
              </div>
              <button className='inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-violet-600 text-white shadow-lg shadow-violet-200/50 transition hover:-translate-y-0.5'>
                <MessageSquare className='w-5 h-5' />
              </button>
            </div>

            <div className='p-4'>
              <label className='relative block'>
                <Search className='absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                <input
                  type='search'
                  placeholder='Search chats...'
                  className='w-full rounded-3xl border border-slate-200 bg-slate-50/90 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100'
                />
              </label>
            </div>

            <div className='divide-y divide-slate-200/80'>
              {conversationThreads.map((thread) => (
                <motion.button
                  key={thread.id}
                  onClick={() => setActiveThread(thread.id)}
                  whileHover={{ scale: 1.01 }}
                  className={`w-full text-left px-5 py-4 flex items-center gap-4 transition ${
                    thread.id === activeThread
                      ? "bg-violet-600/5"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <img
                    src={thread.avatar}
                    alt={thread.name}
                    className='h-14 w-14 rounded-3xl object-cover border border-slate-200'
                  />
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between gap-2'>
                      <h3 className='truncate text-sm font-semibold text-slate-900'>{thread.name}</h3>
                      <span className='text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400'>
                        {thread.time}
                      </span>
                    </div>
                    <p className='mt-1 truncate text-sm text-slate-500'>{thread.lastMessage}</p>
                  </div>
                  {thread.unread > 0 ? (
                    <span className='inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white'>
                      {thread.unread}
                    </span>
                  ) : null}
                </motion.button>
              ))}
            </div>
          </motion.aside>

          <motion.section
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className='rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl flex flex-col overflow-hidden'
          >
            <div className='flex flex-col gap-6 p-6 border-b border-gray-200/70 md:flex-row md:items-center md:justify-between'>
              <div>
                <p className='text-xs uppercase tracking-[0.35em] text-violet-500 font-bold'>Active chat</p>
                <h2 className='mt-2 text-2xl font-black text-slate-900'>{activeThreadData?.name || "Vendor Chat"}</h2>
                <p className='mt-1 text-sm text-slate-500'>Connected with your event team and vendors in one place.</p>
              </div>
              <div className='rounded-3xl bg-slate-50 px-4 py-3 inline-flex items-center gap-3 text-sm text-slate-600'>
                <CalendarDays className='h-4 w-4 text-violet-500' />
                <span>Event check-in: May 24</span>
              </div>
            </div>

            <div className='flex-1 overflow-hidden'>
              <div className='h-full overflow-y-auto px-6 py-6 space-y-4'>
                {activeMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`max-w-[85%] ${
                      message.author === "me"
                        ? "ml-auto rounded-[2rem] bg-violet-600 text-white px-5 py-4 shadow-[0_20px_70px_rgba(124,58,237,0.12)]"
                        : "rounded-[2rem] border border-slate-200 bg-slate-100 text-slate-800 px-5 py-4"
                    }`}
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <p className='text-sm leading-6'>{message.text}</p>
                      <span className={`text-[11px] font-semibold ${message.author === "me" ? "text-violet-100/90" : "text-slate-400"}`}>
                        {message.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='border-t border-gray-200/70 bg-slate-50 p-5'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <div className='relative flex-1'>
                  <textarea
                    rows={1}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder='Write a message...'
                    className='min-h-[78px] w-full resize-none rounded-[1.75rem] border border-slate-200 bg-white px-5 py-4 pr-14 text-sm text-slate-700 outline-none shadow-sm focus:border-violet-400 focus:ring-2 focus:ring-violet-100'
                  />
                  <div className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs'>
                    Press enter to send
                  </div>
                </div>
                <button
                  type='button'
                  className='inline-flex items-center justify-center rounded-3xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200/40 transition hover:bg-violet-700'
                >
                  <Send className='mr-2 h-4 w-4' />
                  Send message
                </button>
              </div>
              <div className='mt-4 flex flex-wrap gap-3 text-sm text-slate-500'>
                <span className='inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200'>
                  <User className='h-4 w-4 text-violet-500' />
                  4 vendors active
                </span>
                <span className='inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200'>
                  <Clock3 className='h-4 w-4 text-slate-500' />
                  Response time: under 10 min
                </span>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Messages;
