---
title: "Spotify API Alternatives for your Spotify Data"
date: "April 11, 2026"
description: "How to retrieve your Spotify data without using Spotify API"
image: "/blogs/spotify-api.jpg"
tags: ["API", "Spotify", "Music Tech"]
author: "Dennis Magaki"
---

## Introduction

Since late 2024, Spotify has implemented significant changes to its public Web API which have affected how many third-party developers interact with the API. These changes have elicited, not suprisingly, very strong reactions from non-supporters of these changes and supporters alike.

These article will explain what changes Spotify made, the reasons these changes were implemented, reactions from both sides of the affected parties, and popular workarounds to these changes.

---

## Changes to Spotify Web API

In November 2024, Spotify announced changes to their Web API that would restrict access to certain endpoints for new applications. Existing applications continued to remain unaffected.

Some of the blocked endpoints included:

- Related Artists
- Audio Features
- Recommendations
- Featured Playlists

and a few other endpoints.

---

### Spotify's explanation

According to them, the main objective of these changes was to create a more secure platform that would make sure that the API is used in such a manner that serve artists, users, and others while maintaining integrity of the service. They also add that Spotify regularly reviews API usage and make changes based on ever-changing use cases.

---

### Third-Party Developer Reaction

These restrictions elicited discord within the developer community, where some of the developers saw the changes as a protective measure to prevent data scraping, and others were frustrated as they claim there wasn't significant advance notice, and that project built around these endpoints may no longer function as intended.

---

## February 2026 Major Spotify API Changelog

Almost around 15 months later, Spotify announced a second wave of changes to their Web API, which to the agreement of many in the developer community, spelt the ultimate doom to Spotify API. 

The latest update requires a Premium Subscription for developer access and reduces test users from 25 to 5. This time round, even basic endpoints were restricted or completely stripped down.

---

### Spotify's Rationale on this Changelog

Spotify claims that the latest round of changes are about safety.

> “Advances in automation and AI have fundamentally altered the usage patterns and risk profile of developer access,” the company wrote in its announcement.

---

### Spotify Fallout with its Dev Community

This particular changelog seemed to be the final straw for most developers using Spotify API, with many of them seeking alternatives to other music providers like Apple Music and Deezer. They claim that the API is now obsolete and would not be economically viable to pay premium subscriptions for basic endpoints. What is now left is a trail of dead applications that are now obsolete thanks to Spotify.

---

## Workarounds and Alternatives

Developers are now exploring other alternatives to access their Spotify data, including myself. Some of these alternatives may require separate agreements and creating applications in these third-party providers. There is one service that particularly stands out to me and that is [Last.fm](https://last.fm)

---

## What is Last.fm?

Last.fm is a music streaming platform that allows users to track their music listening habits and discover new artists. It utilizes a system called **AudioScrobbler** which _scrobbles_ your music and creates a personalized profile based on your listening preferences. You can connect various music providers to Last.fm like Spotify, Apple Music, and Youtube. Last.fm also provide an API where you can extract your music listening habits, and I am going to show you how to do that, specifically extracting basic Spotify data from Last.fm, bypassing the restricted Spotify API.

---

### Getting Started

You will first need to create a Last.fm account if you don't already have one and connect it to your Spotify account. You don't need a Premium subscription to allow Last.fm to access your account. Head over to [Last.fm](https://last.fm) to create your account.

After creating your account, you will need to scroll down all the way to Last.fm's footer section where they have various links, including their API page under the "Goodies" section. Click on it to go to their API page and create an API account. This will enable us to get our `API_KEY`. You also need to make sure you have your Last.fm username since it will be the identifier to what users data will be collected. You can read their documentation to familiarize yourself with their API before we move on to the next stage.

---

### Last.fm API Methods

Last.fm provides a range of API methods that would be very useful to alot of developers relyiing on Spotify or other music providers for their applications. 

> The API root URL is located at http://ws.audioscrobbler.com/2.0/

In this article, we will only use one basic endpoint, `user.getRecentTracks`. This endpoint gets a list of recent songs played by a user, and it also includes a `nowplaying="true"` attribute if the song is being currently played. This endpoint does NOT require authentication.

The following is are sample urls and responses from these endpoints:

JSON: ```/?method=user.getrecenttracks&user=rj &api_key=YOUR_API_KEY&format=json```

XML: ```/?method=user.getrecenttracks&user=rj &api_key=YOUR_API_KEY```

Sample response:
```xml
<recenttracks user="RJ" page="1" perPage="10" totalPages="3019">
  <track nowplaying="true">
    <artist mbid="2f9ecbed-27be-40e6-abca-6de49d50299e">Aretha Franklin</artist>
    <name>Sisters Are Doing It For Themselves</name>
    <mbid/>
    <album mbid=""/>
    <url>www.last.fm/music/Aretha+Franklin/_/Sisters+Are+Doing+It+For+Themselves</url>
    <date uts="1213031819">9 Jun 2008, 17:16</date>
    <streamable>1</streamable>
  </track>
  ...
</recenttracks>
```

We will now use API testing tools like Postman to test our API and see if we can retrieve our data. Go to Postman, open a tab, choose the GET method and post this URL and make sure to replace your username and API key into the url.

`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=your-username&api_key=your-api-key&format=json&limit=2`

If successfull, you should get an output that resembles this:

```json
{
    "recenttracks": {
        "track": [
            {
                "artist": {
                    "mbid": "a8457fc0-32f9-4b1a-b908-7e9c0bcc80b9",
                    "#text": "Sauti Sol"
                },
                "streamable": "0",
                "image": [
                    {
                        "size": "small",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    },
                    {
                        "size": "medium",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/64s/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    },
                    {
                        "size": "large",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/174s/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    },
                    {
                        "size": "extralarge",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    }
                ],
                "mbid": "",
                "album": {
                    "mbid": "8dc7d983-8b4f-4393-b618-b7d25c55c047",
                    "#text": "Live and Die in Afrika"
                },
                "name": "It's Okay",
                "url": "https://www.last.fm/music/Sauti+Sol/_/It%27s+Okay",
                "date": {
                    "uts": "1775823364",
                    "#text": "10 Apr 2026, 12:16"
                }
            },
            {
                "artist": {
                    "mbid": "a8457fc0-32f9-4b1a-b908-7e9c0bcc80b9",
                    "#text": "Sauti Sol"
                },
                "streamable": "0",
                "image": [
                    {
                        "size": "small",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    },
                    {
                        "size": "medium",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/64s/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    },
                    {
                        "size": "large",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/174s/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    },
                    {
                        "size": "extralarge",
                        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/3d1e1ff62e2de31a989cd7d4a4c13d46.jpg"
                    }
                ],
                "mbid": "695cfb63-37e5-488a-8d7b-e82e99442e2d",
                "album": {
                    "mbid": "8dc7d983-8b4f-4393-b618-b7d25c55c047",
                    "#text": "Live and Die in Afrika"
                },
                "name": "Isabella",
                "url": "https://www.last.fm/music/Sauti+Sol/_/Isabella",
                "date": {
                    "uts": "1775823153",
                    "#text": "10 Apr 2026, 12:12"
                }
            }
        ],
        "@attr": {
            "user": "DennisPortfolio",
            "totalPages": "840",
            "page": "1",
            "perPage": "2",
            "total": "1680"
        }
    }
}
```

This means you are now able to fetch your Spotify data without using Spotify's API and you can use it to create your own applications.

---

## Conclusion

With this workaround, you are now able to create your applications without worrying about Spotify's API management that would abruptly render your applications useless. Not only does Last.fm support Spotify, but also many other music providers which provides a richer dataset for your to build your application upon.

---

## References

- [Why Spotify Has Restricted Its API Access: What Changed and Why It Matters in 2026](https://voclr.it/news/why-spotify-has-restricted-its-api-access-what-changed-and-why-it-matters-in-2026/)
- [Spotify Just Killed Thousands of Third-Party Music Apps, and Developers Reveal Which Ones Are Next](https://www.headphonesty.com/2026/02/spotify-crackdown-thousands-third-party-music-apps/)

## Resources

- [Last.fm API Docs](https://www.last.fm/api)

---