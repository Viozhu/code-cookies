import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Cookie, Mail, Twitter, Facebook, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  const linkClasses = cn(
    'text-sm text-gray-400 hover:text-white transition-colors duration-200',
    'relative group inline-block',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded',
    'min-h-[44px] flex items-center'
  )

  if (external) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
      </a>
    )
  }

  return (
    <Link to={href} className={linkClasses}>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
    </Link>
  )
}

interface SocialIconProps {
  platform: 'twitter' | 'facebook' | 'instagram'
  url: string
}

function SocialIcon({ platform, url }: SocialIconProps) {
  const icons = {
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
  }

  const Icon = icons[platform]

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center',
        'hover:bg-gray-700 transition-colors duration-200',
        'text-gray-400 hover:text-white',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900'
      )}
      aria-label={`Visit our ${platform} page`}
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
    </motion.a>
  )
}

function FooterBrand() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Cookie className="w-8 h-8 text-white" aria-hidden="true" />
        <span className="text-xl font-bold text-white">CodeCookies</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">
        Teaching kids the logic of programming through fun puzzles and rewards.
      </p>
    </motion.div>
  )
}

function FooterLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-white font-semibold mb-4 text-base">Quick Links</h3>
      <ul className="space-y-3">
        <li>
          <FooterLink href="/#features">Features</FooterLink>
        </li>
        <li>
          <FooterLink href="/#how-it-works">How It Works</FooterLink>
        </li>
        <li>
          <FooterLink href="/#benefits">Benefits</FooterLink>
        </li>
        <li>
          <FooterLink href="/#faq">FAQ</FooterLink>
        </li>
      </ul>
    </motion.div>
  )
}

function FooterLegal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-white font-semibold mb-4 text-base">Legal</h3>
      <ul className="space-y-3">
        <li>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </li>
        <li>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
        </li>
        <li>
          <FooterLink href="/coppa">COPPA Compliance</FooterLink>
        </li>
        <li>
          <FooterLink href="/gdpr">GDPR Compliance</FooterLink>
        </li>
      </ul>
    </motion.div>
  )
}

function FooterContact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-white font-semibold mb-4 text-base">Contact</h3>
      <ul className="space-y-3">
        <li>
          <a
            href="mailto:support@codecookies.com"
            className={cn(
              'text-sm text-gray-400 hover:text-white transition-colors duration-200',
              'relative group inline-block',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded',
              'min-h-[44px] flex items-center'
            )}
          >
            <Mail className="w-4 h-4 mr-2 inline" aria-hidden="true" />
            support@codecookies.com
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
          </a>
        </li>
        <li className="flex gap-4 mt-6">
          <SocialIcon platform="twitter" url="https://twitter.com/codecookies" />
          <SocialIcon platform="facebook" url="https://facebook.com/codecookies" />
          <SocialIcon platform="instagram" url="https://instagram.com/codecookies" />
        </li>
      </ul>
    </motion.div>
  )
}

function FooterCopyright() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="border-t border-gray-800 pt-8 mt-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} CodeCookies. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          COPPA & GDPR Compliant • Safe for Kids
        </p>
      </div>
    </motion.div>
  )
}

export function Footer() {
  return (
    <footer
      className={cn(
        'bg-gray-900 text-gray-300',
        'py-12 md:py-16',
        'w-full',
        'relative'
      )}
      role="contentinfo"
    >
      {/* Subtle gradient accent at top for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <FooterBrand />
          <FooterLinks />
          <FooterLegal />
          <FooterContact />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  )
}

