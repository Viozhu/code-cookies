import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { SectionDivider } from './SectionDivider'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 'age-appropriateness',
    question: 'What age is this suitable for?',
    answer:
      'CodeCookies is designed for children ages 8-14, though younger children with strong reading skills or older children new to programming logic may also enjoy it. The puzzles start simple and gradually increase in complexity, making it accessible to beginners while still challenging for more advanced learners.',
  },
  {
    id: 'progress-saving',
    question: 'How is progress saved and can it be lost?',
    answer:
      'Your progress is automatically saved to your account as you complete puzzles. All achievements, earned cookies, and completed challenges are securely stored in the cloud. As long as you log in with the same account, your progress will always be available. We recommend saving your login information in a safe place.',
  },
  {
    id: 'safety',
    question: 'What safety measures are in place? (COPPA/GDPR compliance)',
    answer:
      'CodeCookies is fully compliant with COPPA (Children\'s Online Privacy Protection Act) and GDPR (General Data Protection Regulation). We never collect personal information without parental consent, use minimal data collection practices, and provide parents with full control over their child\'s account. All data is encrypted and stored securely. Parents can review, modify, or delete their child\'s data at any time through the parent dashboard.',
  },
  {
    id: 'how-cookies-work',
    question: 'How do cookies work?',
    answer:
      'Cookies are rewards you earn by solving logic puzzles! Each completed puzzle earns you cookies that you can collect in your Cookie Jar. These cookies track your progress and unlock new challenges. Think of them as achievement badges that show how much you\'ve learned. The more puzzles you solve, the more cookies you collect!',
  },
  {
    id: 'parent-tracking',
    question: 'Can parents track their child\'s progress?',
    answer:
      'Yes! Parents have access to a dedicated dashboard where they can see their child\'s progress, completed puzzles, earned cookies, and learning achievements. Parents receive regular progress reports and can see which areas their child is excelling in or may need more practice with. This helps parents support their child\'s learning journey.',
  },
  {
    id: 'devices-supported',
    question: 'What devices are supported?',
    answer:
      'CodeCookies works on all modern devices! You can access it on desktop computers (Windows, Mac, Linux), tablets (iPad, Android tablets), and smartphones (iPhone, Android phones). Our responsive design ensures a great experience on any screen size. We recommend using a tablet or computer for the best puzzle-solving experience, but mobile devices work great too!',
  },
]

export function FAQ() {
  return (
    <>
      <section
        className={cn(
          'section',
          'bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-gray-900',
          'py-16 md:py-20 lg:py-24',
          'relative'
        )}
        id="faq"
      >
        {/* Gradient transition to footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className={cn(
              'section-heading',
              'text-4xl md:text-5xl',
              'font-bold mb-4',
              'text-white'
            )}
          >
            Frequently Asked Questions
          </h2>
          <p
            className={cn(
              'body-text',
              'text-lg md:text-xl',
              'text-gray-300',
              'max-w-2xl mx-auto'
            )}
          >
            Got questions? We've got answers!
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible defaultValue={null}>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <AccordionItem value={faq.id} className="border-gray-700">
                  <AccordionTrigger className="text-left text-white hover:bg-gray-800/50 group">
                    <span className="group-hover:text-[#A5F344] transition-colors duration-200">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
      </section>
      <SectionDivider variant="content-to-dark" />
    </>
  )
}

