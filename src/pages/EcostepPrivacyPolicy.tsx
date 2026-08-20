import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function EcostepPrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-foreground selection:bg-primary/30 font-sans pb-32">
      <div className="max-w-[800px] mx-auto px-6 py-20 md:py-32">
        <FadeIn>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={20} />
            Back to Vortex Labs
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Privacy Policy for EcoStep</h1>
          <p className="text-xl text-muted-foreground mb-16">Effective Date: August 2026</p>
        </FadeIn>

        <div className="space-y-12 text-white/80 leading-relaxed">
          <FadeIn delay={0.2}>
            <p>
              This privacy policy applies to the EcoStep mobile application (hereby referred to as "Application") for mobile devices that was created to help users track and improve their daily sustainability habits.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <h2 className="text-2xl text-white font-medium mb-4">1. What information does the Application obtain and how is it used?</h2>
            
            <h3 className="text-xl text-white/90 font-medium mt-8 mb-3">User Provided Information</h3>
            <p className="mb-4">
              The Application obtains the information you provide when you download and register the Application. Registration with us is optional. However, please keep in mind that you may not be able to use some of the features offered by the Application unless you register with us.
            </p>
            <p className="mb-4">
              When you register with us and use the Application, you generally provide:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">
              <li>Your email address and a password (used for secure login).</li>
              <li>Profile information you choose to enter.</li>
              <li>Information related to your sustainability tasks, habits, or app-specific activities.</li>
            </ul>
            <p className="mb-8">
              We may also use the information you provided us to contact you from time to time to provide you with important information, required notices, and marketing promotions.
            </p>

            <h3 className="text-xl text-white/90 font-medium mb-3">Automatically Collected Information</h3>
            <p>
              In addition, the Application may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile devices unique device ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browsers you use, and information about the way you use the Application.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <h2 className="text-2xl text-white font-medium mb-4">2. Third-Party Services</h2>
            <p className="mb-4">
              The Application utilizes third-party services that may collect information used to identify you. Below are the links to the privacy policies of the third-party service providers used by the Application:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Play Services</a></li>
              <li><a href="https://firebase.google.com/support/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Firebase Authentication</a></li>
              <li><a href="https://cloud.google.com/terms/cloud-privacy-notice" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Cloud Firestore</a></li>
            </ul>
            <p>
              These services are strictly used to authenticate your account securely and store your app data (such as your eco-friendly habits and progress) so that it syncs across your devices.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <h2 className="text-2xl text-white font-medium mb-4">3. Data Retention Policy and User Rights</h2>
            <p className="mb-4">
              We will retain User Provided data for as long as you use the Application and for a reasonable time thereafter.
            </p>
            <p>
              <strong>Data Deletion:</strong> If you would like us to delete the User Provided Data that you have provided via the Application, please contact us (or delete your account directly through the Application settings). We will respond in a reasonable time and delete your data from our active databases (Firebase).
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <h2 className="text-2xl text-white font-medium mb-4">4. Security</h2>
            <p>
              We are concerned about safeguarding the confidentiality of your information. We provide physical, electronic, and procedural safeguards to protect information we process and maintain. For example, your passwords and emails are encrypted and handled securely by Google Firebase Authentication. Please be aware that, although we endeavor provide reasonable security for information we process and maintain, no security system can prevent all potential security breaches.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.7}>
            <h2 className="text-2xl text-white font-medium mb-4">5. Changes</h2>
            <p>
              This Privacy Policy may be updated from time to time for any reason. We will notify you of any changes to our Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.8}>
            <h2 className="text-2xl text-white font-medium mb-4">6. Contact Us</h2>
            <p>
              If you have any questions regarding privacy while using the Application, or have questions about our practices, please contact us. <a href="mailto:info@vortexlabsworld.com" className="text-primary hover:underline">info@vortexlabsworld.com</a>
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
