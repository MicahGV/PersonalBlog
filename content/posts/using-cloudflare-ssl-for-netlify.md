---
title: Using Cloudflare SSL for Netlify
date: '2018-12-28T20:36:18-06:00'
draft: false
tags:
  - Cloudflare
  - Netlify
  - SSL
categories:
  - JAMStack
---
![Cloud Flare SSL Full Settings](/img/FullSettings.png#mid)

This is an article that will walk you through on how to set up a Cloudflare Full SSL Certificate for Netlify. I wrote this more or less for my future reference, but I thought it might help you, you adorable internet stranger you. 

_Side Note: I'm not going to talk about my opinion on whether you should Cloudflare's or Netlify's DNS, CDN, and SSL Certificate. I'm just going to show you how to set up using cloudflare, you can look at debates else where. _

- - -

Here's some quick links for stuff in the article that I used for my own edification and maybe yours.

## Links

* [Intermediate Cloudflare Certs](https://support.cloudflare.com/hc/en-us/articles/115001186052-What-intermediates-and-roots-are-Cloudflare-issued-certs-signed-against-)
* [Cloudflare DNS Netlify Host Article](https://jaketrent.com/post/cloudflare-dns-netlify-host/)
* [Netlify - SSL CloudFlare Forum question](https://community.cloudflare.com/t/netlify-ssl/19749)
* [NET::ERR_CERT_AUTHORITY_INVALID](https://community.cloudflare.com/t/ssl-issue-net-err-cert-authority-invalid-works-on-one-domain-but-not-other/12641)
*  [Differences of Cloudflare SSL Options](https://support.cloudflare.com/hc/en-us/articles/200170416-What-do-the-SSL-options-Off-Flexible-SSL-Full-SSL-Full-SSL-Strict-mean-)

- - -

First, I'll walk you through all the steps that I did.

1. Login to your cloudflare site and navigate to your domain
2. Next have your CNAMEs's clouds be orange. The reasoning is that if they are NOT turned on all traffic will be routed to the Netlify CDN causing the connections to attempt to use a Netlify SSL Certificate rather than Cloudflare's. [reference](https://community.cloudflare.com/t/ssl-issue-net-err-cert-authority-invalid-works-on-one-domain-but-not-other/12641/2).
3. Then Click the Crypto Tab

![Cloud Flare Tabs](/img/cryptoline.png#mid)

4. Change SSL dropdown to Full like in the picture at top.
5. Scroll down till you see Origin Certificates. Click Create Certificate and then hit next.
6. Copy the PEM formatted Origin Certificate and associated Private Key to some place for later use. Then hit okay
7. Login into Netlify and go to your site, if you aren't there already.
8. Click Domain Settings and scroll down to HTTPS and select Use Custom Certificate. You'll be presented with something like below

![Netlify Install Custom Certificate Modal](/img/netlifyCert.png#mid)

9. Insert your PEM Formatted Certificate and Private Key into their appropriate text box
10. Then open in another tab this [link](https://support.cloudflare.com/hc/en-us/articles/115001186052-What-intermediates-and-roots-are-Cloudflare-issued-certs-signed-against-).
11. Copy either highlighted urls from the download column. Then paste that url into the Intermediate Certs on the Netlify certificate page.

![Cloudflare Intermediate Certs](/img/cloudflareintermediatecerts.png#mid)

Then congratulations, you're done, and you should now have a SSL Certificate installed on your site.
