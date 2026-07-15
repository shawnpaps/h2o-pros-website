export const WelcomeBanner = () => (
  <div className="h2o-welcome">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      className="h2o-welcome__logo"
      src="/h2o-logo.webp"
      alt=""
      width={72}
      height={72}
    />
    <div className="h2o-welcome__copy">
      <h1>Welcome, H2O Pros Team! 👋</h1>
      <p>
        This is your content hub — update services, locations, reviews, FAQs, gallery photos, and
        site settings below. Changes publish to the live website within a few minutes.
      </p>
      <a className="h2o-welcome__guide" href="/admin/guide">
        📖 New here? Read the How-To Guide
      </a>
    </div>
  </div>
)
