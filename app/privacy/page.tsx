import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Redline",
};

export default function PrivacyPage() {
  return (
    <main className="relative z-10 min-h-screen bg-[#050505] text-slate-300">
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        {/* Back link */}
        <Link
          href="/"
          className="text-[10px] uppercase tracking-[0.3em] text-slate-600 hover:text-[#dc2626] transition-colors mb-12 inline-block"
        >
          &larr; Back
        </Link>

        {/* Header */}
        <h1 className="text-white text-3xl font-bold tracking-tight mb-1">
          Privacy Policy
        </h1>
        <p className="text-slate-600 text-sm mb-12">
          Effective Date: March 13, 2026
        </p>

        <div className="space-y-10 text-[13px] leading-relaxed">
          <p>
            Redline (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an AI-powered
            training advisor application designed for athletes. This Privacy Policy explains how we
            collect, use, store, and protect your personal information when you use the Redline mobile
            application and related services (collectively, the &ldquo;Service&rdquo;).
          </p>
          <p>
            By using Redline, you agree to the collection and use of information as described in this
            policy. If you do not agree, please do not use the Service.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">1. Information We Collect</h2>

            <h3 className="text-white text-sm font-medium mb-2">1.1 Information You Provide</h3>
            <ul className="list-none space-y-2 mb-6">
              <li><strong className="text-white">Account Information:</strong> Name, email address, and password when you create an account.</li>
              <li><strong className="text-white">Profile Information:</strong> Age, gender, training experience, athlete archetype, fitness goals, available equipment, and training schedule.</li>
              <li><strong className="text-white">Training Data:</strong> Workout logs including exercises, sets, reps, RPE (rate of perceived exertion), duration, modality, and session ratings you manually enter.</li>
              <li><strong className="text-white">Check-In Data:</strong> Daily self-reported metrics including sleep quality, energy level, soreness, stress, motivation, injury status, and body map selections.</li>
              <li><strong className="text-white">Chat Messages:</strong> Questions and messages you send to the AI coaching feature.</li>
              <li><strong className="text-white">Progress Photos:</strong> Photos you voluntarily upload to track physique changes.</li>
              <li><strong className="text-white">Existing Programs:</strong> Training programs you share with us for import into the app.</li>
            </ul>

            <h3 className="text-white text-sm font-medium mb-2">1.2 Information from Third-Party Services</h3>
            <ul className="list-none space-y-2 mb-4">
              <li><strong className="text-white">Apple HealthKit:</strong> With your explicit permission, we read health data including heart rate, heart rate variability (HRV), resting heart rate, and sleep duration. We do not write data to HealthKit. We only access data types you explicitly authorize.</li>
              <li><strong className="text-white">Garmin Connect:</strong> With your explicit permission, we receive health and activity data including heart rate, sleep, stress, steps, and activity summaries through the Garmin Connect API. Data is delivered via secure webhooks after you authorize the connection through Garmin&apos;s OAuth consent flow.</li>
            </ul>
            <p className="mb-6">You may revoke third-party data access at any time through your device settings (HealthKit) or through the Garmin Connect app.</p>

            <h3 className="text-white text-sm font-medium mb-2">1.3 Information Collected Automatically</h3>
            <ul className="list-none space-y-2">
              <li><strong className="text-white">Usage Data:</strong> App open events, feature usage patterns, and interaction timestamps used to improve the Service.</li>
              <li><strong className="text-white">Device Information:</strong> Device type, operating system version, and app version for compatibility and debugging purposes.</li>
            </ul>
            <p className="mt-4">We do not collect location data, contacts, browsing history, or any data unrelated to the training advisory service.</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information exclusively to provide, maintain, and improve the Redline training advisory service:</p>
            <ul className="list-none space-y-2">
              <li><strong className="text-white">AI-Powered Recommendations:</strong> Your check-in data, wearable metrics, training history, and profile are processed by our AI system to generate personalized daily training recommendations.</li>
              <li><strong className="text-white">Readiness Scoring:</strong> Health metrics and self-reported data are combined to calculate a daily readiness score that informs your training options.</li>
              <li><strong className="text-white">Training Load Management:</strong> Historical session data is used to calculate acute and chronic workload ratios to prevent overtraining.</li>
              <li><strong className="text-white">Workout Scoring:</strong> Logged sessions are scored across multiple dimensions to provide feedback on training quality.</li>
              <li><strong className="text-white">Coaching Chat:</strong> Your messages and training context are sent to our AI provider to generate coaching responses.</li>
              <li><strong className="text-white">Service Improvement:</strong> Aggregated, de-identified usage patterns help us improve recommendation accuracy and app features.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">3. AI Processing and Third-Party AI Services</h2>
            <p className="mb-3">Redline uses Anthropic&apos;s Claude API to power AI recommendations and coaching chat. When you interact with the AI features:</p>
            <ul className="list-none space-y-2">
              <li>Your training context (readiness score, recent sessions, profile, goals, and check-in data) is sent to Anthropic&apos;s API to generate responses. Anthropic processes this data according to their privacy policy and data handling practices. Anthropic does not use API inputs to train their models.</li>
              <li>We do not send your name, email, or other directly identifying information to the AI provider. Training context is sent with your internal user ID only.</li>
              <li>Chat messages and AI responses are stored in our database to maintain conversation history and improve the service.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">4. Data Storage and Security</h2>
            <p className="mb-3">Your data is stored in a PostgreSQL database hosted on secure, encrypted infrastructure. We implement industry-standard security measures including:</p>
            <p className="mb-3">Encryption in transit (TLS/HTTPS) for all data transmission. Encrypted database storage for sensitive personal information. JWT-based authentication with automatic token refresh and expiration. Rate limiting on all API endpoints to prevent abuse.</p>
            <p>Progress photos are stored in secure cloud storage (Supabase Storage) with access restricted to authenticated users viewing their own photos.</p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">5. Data Sharing</h2>
            <p className="mb-4">We do not sell, rent, or trade your personal information to third parties. We share data only in the following limited circumstances:</p>
            <ul className="list-none space-y-2">
              <li><strong className="text-white">AI Processing:</strong> Training context (not directly identifying information) is shared with Anthropic&apos;s Claude API to generate recommendations and chat responses.</li>
              <li><strong className="text-white">Infrastructure Providers:</strong> Your data is stored and processed by our hosting and database providers (Railway, Supabase) under their respective data processing agreements.</li>
              <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law, legal process, or government request.</li>
              <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction. We will notify you of any such change.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">6. HealthKit and Garmin Data Compliance</h2>

            <h3 className="text-white text-sm font-medium mb-2">Apple HealthKit</h3>
            <p className="mb-4">HealthKit data is used solely to provide training recommendations and readiness scores within the Redline app. We do not store raw HealthKit data on our servers beyond what is necessary for the readiness calculation (processed metrics only). HealthKit data is never used for advertising, marketing, or sold to third parties. HealthKit data is never shared with third parties except as required to provide core app functionality. We do not use HealthKit data to build user profiles for purposes unrelated to the health and fitness advisory service.</p>

            <h3 className="text-white text-sm font-medium mb-2">Garmin Connect</h3>
            <p>Garmin data is accessed only after explicit user consent through Garmin&apos;s OAuth authorization flow. We only subscribe to data types relevant to training recommendations: heart rate, sleep, stress, activity summaries, and body composition. Garmin data is used exclusively to enhance readiness scoring and training recommendations. Users may disconnect Garmin at any time through the app or through Garmin Connect settings.</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">7. Data Retention</h2>
            <p className="mb-3">We retain your data for as long as your account is active and as needed to provide the Service:</p>
            <ul className="list-none space-y-2 mb-4">
              <li><strong className="text-white">Account and Profile Data:</strong> Retained while your account is active.</li>
              <li><strong className="text-white">Training Sessions and Check-Ins:</strong> Retained to provide historical analysis, workload calculations, and long-term progress tracking.</li>
              <li><strong className="text-white">Chat Messages:</strong> Retained to maintain coaching conversation context.</li>
              <li><strong className="text-white">Progress Photos:</strong> Retained until you delete them or delete your account.</li>
              <li><strong className="text-white">Wearable Data:</strong> Processed metrics are retained; raw data streams are not stored beyond initial processing.</li>
            </ul>
            <p>Upon account deletion, we will delete your personal data within 30 days, except where retention is required by law.</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">8. Your Rights and Choices</h2>
            <ul className="list-none space-y-2">
              <li><strong className="text-white">Access:</strong> You can view your profile, training history, and check-in data within the app at any time.</li>
              <li><strong className="text-white">Correction:</strong> You can update your profile information, goals, and training schedule through the app.</li>
              <li><strong className="text-white">Deletion:</strong> You can request complete deletion of your account and all associated data by contacting us.</li>
              <li><strong className="text-white">Data Portability:</strong> You can request an export of your training data by contacting us.</li>
              <li><strong className="text-white">Withdraw Consent:</strong> You can revoke HealthKit or Garmin access at any time through your device or app settings.</li>
              <li><strong className="text-white">Opt Out:</strong> You can stop using the Service at any time by deleting the app.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">9. Children&apos;s Privacy</h2>
            <p>Redline is not intended for use by anyone under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected data from a child under 13, we will delete it promptly.</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy within the app and updating the effective date above. Your continued use of the Service after changes are posted constitutes acceptance of the revised policy.</p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-white text-lg font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:</p>
            <p><strong className="text-white">Email:</strong> redlinetrainingai@gmail.com</p>
            <p><strong className="text-white">App:</strong> Redline — AI Training Advisor</p>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-white/[0.05] text-slate-700 text-[11px]">
            &copy; 2026 Redline. All rights reserved.
          </div>
        </div>
      </div>
    </main>
  );
}
