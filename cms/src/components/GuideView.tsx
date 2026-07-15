import type { AdminViewServerProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import React from 'react'

/**
 * "How-To Guide" — a read-only help page inside the admin at /admin/guide.
 * Written for the site owner (not technical), so it explains every collection
 * in plain English with step-by-step recipes for the most common tasks.
 */
export function GuideView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  if (!initPageResult.req.user) {
    redirect('/admin/login')
  }

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <div className="h2o-guide">
          <header className="h2o-guide__intro">
            <h1>📖 How to update your website</h1>
            <p>
              Everything on your website — the words, the photos, the offers, the reviews — is
              managed right here. This page walks you through all of it in plain English. Nothing
              you do here can break the design of the site, so click around with confidence.
            </p>
          </header>

          <nav className="h2o-guide__toc" aria-label="Guide contents">
            <strong>Jump to:</strong>
            <a href="#basics">The basics</a>
            <a href="#map">What controls what</a>
            <a href="#recipes">How do I…?</a>
            <a href="#photos">Photo &amp; video tips</a>
            <a href="#help">If something looks wrong</a>
          </nav>

          <section id="basics">
            <h2>The basics</h2>
            <ul>
              <li>
                <strong>Everything lives in the left sidebar.</strong> Each item under{' '}
                <em>Website Content</em> is a list of things on your site. Click one to see the
                list, click an entry to edit it.
              </li>
              <li>
                <strong>Nothing happens until you click Save.</strong> The Save button is in the
                top-right corner of every editing screen. If you navigate away without saving, your
                changes are discarded.
              </li>
              <li>
                <strong>Saved changes go live right away.</strong> Open the website in another tab
                and refresh the page to see your change. If it doesn&apos;t show up, refresh again
                after a minute — and see the troubleshooting section at the bottom.
              </li>
              <li>
                <strong>Prefer hiding over deleting.</strong> Reviews, offers, and gallery photos
                all have a &quot;Show on website&quot; checkbox. Unchecking it takes the item off
                the site but keeps it here, so you can bring it back any time. Deleting is forever.
              </li>
              <li>
                <strong>Every field explains itself.</strong> The small gray text under each box
                tells you where that text appears and gives an example. When in doubt, read that
                first.
              </li>
              <li>
                <strong>Change one thing at a time.</strong> Edit, save, check the site. That way
                you always know exactly what your change did.
              </li>
            </ul>
          </section>

          <section id="map">
            <h2>What controls what</h2>
            <p>A quick map of the sidebar — where to go depending on what you want to change:</p>
            <table>
              <thead>
                <tr>
                  <th>Sidebar item</th>
                  <th>What it controls</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Site Settings</strong>
                  </td>
                  <td>
                    Info that appears all over the site: business name, phone number, email, hours,
                    counties served, star rating, social media links, your logo, and the big video
                    &amp; photo section at the top of the home page (including its wording). This
                    is the one to check first for &quot;global&quot; changes.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Main Page Headlines</strong>
                  </td>
                  <td>
                    The heading at the top of each main page — Our Services, About Us, Reviews,
                    Contact, and Gallery. Each entry is one page: the small red label, the big
                    headline, and the sentence under it.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Offers</strong>
                  </td>
                  <td>
                    The deal cards in the &quot;Current offers &amp; savings&quot; section of the
                    About Us page.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Services</strong>
                  </td>
                  <td>
                    Every service you offer: its name, description, bullet points, photos, and the
                    full detail page (steps, stats, common questions).
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Locations</strong>
                  </td>
                  <td>
                    The city pages (Tampa, Ocala, and so on) — each one&apos;s intro text, county,
                    nearby areas, and photo.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Reviews</strong>
                  </td>
                  <td>Customer reviews shown on the Reviews page and the home page.</td>
                </tr>
                <tr>
                  <td>
                    <strong>FAQs</strong>
                  </td>
                  <td>
                    The general questions &amp; answers on the home page. (Questions about one
                    specific service live inside that service instead.)
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Gallery Photos</strong>
                  </td>
                  <td>The photo pile on the Gallery page — job photos and before-and-afters.</td>
                </tr>
                <tr>
                  <td>
                    <strong>Media</strong>
                  </td>
                  <td>
                    The library of every photo and video you&apos;ve uploaded. Other sections pick
                    images from here.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Users</strong>
                  </td>
                  <td>Who can log in to this admin. Add teammates here.</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="recipes">
            <h2>How do I…?</h2>

            <div className="h2o-guide__recipe">
              <h3>…change the phone number, email, or hours?</h3>
              <ol>
                <li>
                  Click <strong>Site Settings</strong> in the sidebar.
                </li>
                <li>
                  Phone and email are on the <strong>Business</strong> tab; hours are on the{' '}
                  <strong>Hours &amp; Areas</strong> tab.
                </li>
                <li>
                  Type the new value and click <strong>Save</strong>. It updates everywhere on the
                  site at once — header, footer, contact page, all of it. (The click-to-call and
                  email links update automatically; you never need to touch those.)
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…change the big headline on a page?</h3>
              <ol>
                <li>
                  Click <strong>Main Page Headlines</strong> in the sidebar.
                </li>
                <li>Click the entry for the page you want (each entry is named by its page).</li>
                <li>
                  Edit the small label, headline, or supporting sentence, then click{' '}
                  <strong>Save</strong>.
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…add a new offer, or retire an old one?</h3>
              <ol>
                <li>
                  Click <strong>Offers</strong>, then <strong>Create New</strong> (top right).
                </li>
                <li>
                  Fill in the offer name, the details sentence, and (optionally) the fine print,
                  then <strong>Save</strong>.
                </li>
                <li>
                  To retire an offer, open it and uncheck <strong>Show on website</strong> instead
                  of deleting — you can re-run the same offer next season with one click.
                </li>
                <li>
                  The <strong>Display order</strong> number decides the order on the page — lower
                  numbers come first.
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…change the words or photos at the top of the home page?</h3>
              <ol>
                <li>
                  Click <strong>Site Settings</strong>, then open the{' '}
                  <strong>Home Page Hero</strong> tab.
                </li>
                <li>
                  <strong>Wording</strong> holds the two short phrases beside the photos and the
                  scrolling list of service names along the bottom.
                </li>
                <li>
                  <strong>Video &amp; photos</strong> holds the background video and the three
                  tilted photos.
                </li>
                <li>
                  Click <strong>Save</strong> when you&apos;re done.
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…swap out a photo anywhere on the site?</h3>
              <ol>
                <li>Go to the section that shows the photo (for example Site Settings for the team photo, or a Service for its photos).</li>
                <li>
                  Click the photo field. You can <strong>upload a new file</strong> from your
                  computer or <strong>choose from existing</strong> — photos you&apos;ve uploaded
                  before.
                </li>
                <li>
                  Click <strong>Save</strong>.
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…add a photo to the Gallery?</h3>
              <ol>
                <li>
                  Click <strong>Gallery Photos</strong>, then <strong>Create New</strong>.
                </li>
                <li>Write a short caption (for example &quot;Tankless water heater install&quot;) and upload the photo.</li>
                <li>
                  Check <strong>Tall photo</strong> only if the photo is portrait-shaped (taller
                  than it is wide).
                </li>
                <li>
                  Click <strong>Save</strong>.
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…add a customer review?</h3>
              <ol>
                <li>
                  Click <strong>Reviews</strong>, then <strong>Create New</strong>.
                </li>
                <li>Fill in the customer&apos;s name, their words, and the star rating.</li>
                <li>
                  Click <strong>Save</strong>. Also update the review count in{' '}
                  <strong>Site Settings → Review Rating</strong> so the number next to the stars
                  stays accurate.
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…add or edit a question &amp; answer?</h3>
              <ol>
                <li>
                  For general questions: click <strong>FAQs</strong>, then <strong>Create New</strong>{' '}
                  (or click an existing question to edit it).
                </li>
                <li>
                  For questions about one specific service (&quot;How long does a water heater
                  install take?&quot;): open that service in <strong>Services</strong> instead and
                  scroll to its <strong>Common questions</strong> section.
                </li>
              </ol>
            </div>

            <div className="h2o-guide__recipe">
              <h3>…let a teammate log in?</h3>
              <ol>
                <li>
                  Click <strong>Users</strong> (under Admin), then <strong>Create New</strong>.
                </li>
                <li>Enter their email address and a starting password, then <strong>Save</strong>.</li>
                <li>
                  Share the login page with them and have them change the password after their
                  first login (click their own user, type a new password, Save).
                </li>
              </ol>
            </div>
          </section>

          <section id="photos">
            <h2>Photo &amp; video tips</h2>
            <ul>
              <li>
                <strong>Photos:</strong> JPG, PNG, or WebP all work. Photos straight off a phone
                are fine — just aim to keep files under about 5&nbsp;MB so pages load fast.
              </li>
              <li>
                <strong>Video</strong> (home page background): MP4 format, ideally under about
                10&nbsp;MB. Shorter loops look best.
              </li>
              <li>
                <strong>Landscape vs. portrait:</strong> most spots on the site look best with
                landscape (wider than tall) photos. Portrait photos are great for the Gallery —
                just tick the &quot;Tall photo&quot; box.
              </li>
              <li>
                <strong>Reuse freely:</strong> anything you upload stays in <strong>Media</strong>,
                so you can pick the same photo in multiple places without uploading it twice.
              </li>
            </ul>
          </section>

          <section id="help">
            <h2>If something looks wrong</h2>
            <ul>
              <li>
                <strong>&quot;My change isn&apos;t showing on the site.&quot;</strong> First,
                refresh the website page (on a computer, hold <strong>Shift</strong> while
                clicking refresh to skip your browser&apos;s memory). Then double-check you
                clicked <strong>Save</strong> here — reopen the entry and confirm your change is
                still there.
              </li>
              <li>
                <strong>&quot;Something disappeared from the site.&quot;</strong> Open the entry
                and check its <strong>Show on website</strong> box — it may just be unchecked.
              </li>
              <li>
                <strong>&quot;I&apos;m about to change something and I&apos;m nervous.&quot;</strong>{' '}
                Copy the current text into a note first. Then you can always paste it back.
              </li>
              <li>
                <strong>Locked out?</strong> Use &quot;Forgot password&quot; on the login screen —
                a reset link is emailed to you.
              </li>
              <li>
                <strong>Still stuck?</strong> Email Shawn at{' '}
                <a href="mailto:spapineau@spaptechnology.com">spapineau@spaptechnology.com</a> with
                a screenshot of what you&apos;re seeing.
              </li>
            </ul>
          </section>
        </div>
      </Gutter>
    </DefaultTemplate>
  )
}
