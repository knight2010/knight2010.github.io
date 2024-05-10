if (!self.define) {
    let e, s = {};
    const c = (c, a) => (c = new URL(c + ".js", a).href, s[c] || new Promise((s => {
        if ("document" in self) {
            const e = document.createElement("script");
            e.src = c, e.onload = s, document.head.appendChild(e)
        } else e = c, importScripts(c), s()
    })).then((() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e
    })));
    self.define = (a, i) => {
        const n = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (s[n]) return;
        let t = {};
        const r = e => c(e, n),
            d = {
                module: {
                    uri: n
                },
                exports: t,
                require: r
            };
        s[n] = Promise.all(a.map((e => d[e] || r(e)))).then((e => (i(...e), t)))
    }
}
define(["./workbox-5f5b08d6"], (function(e) {
    "use strict";
    importScripts(), self.addEventListener("message", (e => {
        e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting()
    })), e.clientsClaim(), e.precacheAndRoute([{
        url: "/_next/static/5AMzUELPXC7eY2oJtbjtp/_buildManifest.js",
        revision: "87a3407fdd116f9a14965794935b3f28"
    }, {
        url: "/_next/static/5AMzUELPXC7eY2oJtbjtp/_middlewareManifest.js",
        revision: "fb2823d66b3e778e04a3f681d0d2fb19"
    }, {
        url: "/_next/static/5AMzUELPXC7eY2oJtbjtp/_ssgManifest.js",
        revision: "b6652df95db52feb4daf4eca35380933"
    }, {
        url: "/_next/static/chunks/129-8e32a84ec1e8703b.js",
        revision: "8e32a84ec1e8703b"
    }, {
        url: "/_next/static/chunks/152-b45757b9176f674c.js",
        revision: "b45757b9176f674c"
    }, {
        url: "/_next/static/chunks/2-70c32d541379fb99.js",
        revision: "70c32d541379fb99"
    }, {
        url: "/_next/static/chunks/369-e8f2ba2cc85c0dd6.js",
        revision: "e8f2ba2cc85c0dd6"
    }, {
        url: "/_next/static/chunks/376.3c92590dcf0d862a.js",
        revision: "3c92590dcf0d862a"
    }, {
        url: "/_next/static/chunks/37bf9728.5bae384841dcde6d.js",
        revision: "5bae384841dcde6d"
    }, {
        url: "/_next/static/chunks/524-05696a2671cf01d2.js",
        revision: "05696a2671cf01d2"
    }, {
        url: "/_next/static/chunks/572-c6c8346762a6606d.js",
        revision: "c6c8346762a6606d"
    }, {
        url: "/_next/static/chunks/688.d1adc6900a501266.js",
        revision: "d1adc6900a501266"
    }, {
        url: "/_next/static/chunks/742.6d3a3fc2fafd1bba.js",
        revision: "6d3a3fc2fafd1bba"
    }, {
        url: "/_next/static/chunks/758-79b4f1b284e17a18.js",
        revision: "79b4f1b284e17a18"
    }, {
        url: "/_next/static/chunks/79.eb7c95dab0e45c3e.js",
        revision: "eb7c95dab0e45c3e"
    }, {
        url: "/_next/static/chunks/827-fed880df020d5b81.js",
        revision: "fed880df020d5b81"
    }, {
        url: "/_next/static/chunks/82c1d43a.14dbb1cb481e1c5f.js",
        revision: "14dbb1cb481e1c5f"
    }, {
        url: "/_next/static/chunks/845-311654b20e238d40.js",
        revision: "311654b20e238d40"
    }, {
        url: "/_next/static/chunks/867-624f974e1910ffb8.js",
        revision: "624f974e1910ffb8"
    }, {
        url: "/_next/static/chunks/879-21b99adc8b76a16d.js",
        revision: "21b99adc8b76a16d"
    }, {
        url: "/_next/static/chunks/910.598c19d8e3964441.js",
        revision: "598c19d8e3964441"
    }, {
        url: "/_next/static/chunks/913.f01f3b1556f430ca.js",
        revision: "f01f3b1556f430ca"
    }, {
        url: "/_next/static/chunks/939.9a12be94dbacc24e.js",
        revision: "9a12be94dbacc24e"
    }, {
        url: "/_next/static/chunks/94-c1d96e91c5f9c3c9.js",
        revision: "c1d96e91c5f9c3c9"
    }, {
        url: "/_next/static/chunks/f65a48b9-067decfb353bc5de.js",
        revision: "067decfb353bc5de"
    }, {
        url: "/_next/static/chunks/ff239f9d-ca8347500655c670.js",
        revision: "ca8347500655c670"
    }, {
        url: "/_next/static/chunks/framework-bb5c596eafb42b22.js",
        revision: "bb5c596eafb42b22"
    }, {
        url: "/_next/static/chunks/main-0c2f695881b30dce.js",
        revision: "0c2f695881b30dce"
    }, {
        url: "/_next/static/chunks/pages/%5Bid%5D-73632945ecb22acb.js",
        revision: "73632945ecb22acb"
    }, {
        url: "/_next/static/chunks/pages/_app-3434178aeb3cc8e0.js",
        revision: "3434178aeb3cc8e0"
    }, {
        url: "/_next/static/chunks/pages/_error-3d9ac92a218225f5.js",
        revision: "3d9ac92a218225f5"
    }, {
        url: "/_next/static/chunks/pages/about-758a2a5a8feeddc3.js",
        revision: "758a2a5a8feeddc3"
    }, {
        url: "/_next/static/chunks/pages/account-60fac6b924916634.js",
        revision: "60fac6b924916634"
    }, {
        url: "/_next/static/chunks/pages/embed-a6edd40fc1fb98c4.js",
        revision: "a6edd40fc1fb98c4"
    }, {
        url: "/_next/static/chunks/pages/embed/%5Bid%5D-8154db841bf0d7fa.js",
        revision: "8154db841bf0d7fa"
    }, {
        url: "/_next/static/chunks/pages/index-c90a382cf9aaca1e.js",
        revision: "c90a382cf9aaca1e"
    }, {
        url: "/_next/static/chunks/pages/snippets-f82f191b3312699e.js",
        revision: "f82f191b3312699e"
    }, {
        url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",
        revision: "99442aec5788bccac9b2f0ead2afdd6b"
    }, {
        url: "/_next/static/chunks/webpack-d06b5ae06e50cd15.js",
        revision: "d06b5ae06e50cd15"
    }, {
        url: "/favicon.ico",
        revision: "8b95af57e96141d1562f7281c467a4d7"
    }, {
        url: "/manifest.json",
        revision: "398f622e45d66b2469d082901148f0e4"
    }, {
        url: "/robots.txt",
        revision: "734d628dc1f0f2883aeed8ba4fa5c4ce"
    }, {
        url: "/static/brand/apple-touch-icon.png",
        revision: "27941ca1122d0d540305614e051471fe"
    }, {
        url: "/static/brand/banner.png",
        revision: "26543f14dc8065ec528727fac0130482"
    }, {
        url: "/static/brand/desktop.png",
        revision: "64a798d8af884a42b17311badd60c6cd"
    }, {
        url: "/static/brand/icon.png",
        revision: "5322ab646d41d4e6d7d17cb3d4597786"
    }, {
        url: "/static/brand/logo-banner-transparent.png",
        revision: "564beccbee113e2616c9e0843e192e96"
    }, {
        url: "/static/brand/logo-banner.png",
        revision: "79c34cdc16e25e7b15891919b87f4d6a"
    }, {
        url: "/static/brand/logo-square.png",
        revision: "b66f5ff71a790583d9a1e238fa9e8e18"
    }, {
        url: "/static/brand/social-banner.png",
        revision: "9b7e323ec4247607ee859619f9b65837"
    }, {
        url: "/static/fonts/MonoLisa-Bold.woff2",
        revision: "f544829fd59113733c1b4d35ef1457ad"
    }, {
        url: "/static/fonts/MonoLisa-BoldItalic.woff2",
        revision: "10f628db8baf129fc557a6915f2c633f"
    }, {
        url: "/static/fonts/MonoLisa-Regular.woff2",
        revision: "3d6f07d2d4e4c929f31682dee56e52fa"
    }, {
        url: "/static/fonts/MonoLisa-RegularItalic.woff2",
        revision: "63d7785d2be544ee597de718bf09d7e9"
    }, {
        url: "/static/fonts/monolisa.css",
        revision: "f202842c23941a5035782be4487fd418"
    }, {
        url: "/static/presets/0.png",
        revision: "17d05d4134394587edddcea5c0f0b534"
    }, {
        url: "/static/presets/1.png",
        revision: "45c8e7bd5482fbb26eae15f6623a881a"
    }, {
        url: "/static/presets/2.png",
        revision: "688e89ba818820e1853ea15c1db89e93"
    }, {
        url: "/static/presets/3.png",
        revision: "9301b9c7f62f5069c6bbaba03f566623"
    }, {
        url: "/static/presets/4.png",
        revision: "37272f29e19fe2404a2ed197156fc049"
    }, {
        url: "/static/presets/5.png",
        revision: "72ba297d034b2bd2a52fa4d6eb533ac4"
    }, {
        url: "/static/presets/6.png",
        revision: "550799fc6f185f908b20f9c4154fa57c"
    }, {
        url: "/static/presets/7.png",
        revision: "6ffae154808f8e18a1f11358d9d55cc4"
    }, {
        url: "/static/presets/8.png",
        revision: "c934bfa6e36405d3aa4803ca3f471aa1"
    }, {
        url: "/static/presets/9.png",
        revision: "676ed33951dc2ceb65b880dc1452f6e0"
    }, {
        url: "/static/react-crop.css",
        revision: "d16cce325fd620813031056dc3d61a87"
    }, {
        url: "/static/svg/github.svg",
        revision: "82c86853941a11c0ce641f426f74d6e9"
    }, {
        url: "/static/svg/open-source-companies-2.svg",
        revision: "80193d0f3eae5d473b12e12211d188f8"
    }, {
        url: "/static/svg/open-source-companies.svg",
        revision: "78638edac99c2d05ede744c1d7773b67"
    }, {
        url: "/static/svg/person.svg",
        revision: "ef4972e04ee35b816e8f78d38e0fe6b4"
    }, {
        url: "/static/svg/snippets.svg",
        revision: "cda29d29be24f342ab006283b513a2bf"
    }, {
        url: "/static/themes/night-owl.min.css",
        revision: "5aec034a9148e4fc730bbcfbbb639fbc"
    }, {
        url: "/static/themes/nord.min.css",
        revision: "d72c758c3454e59cbcdaa02921465c81"
    }, {
        url: "/static/themes/one-dark.min.css",
        revision: "ce76ecc191105aac98954d83bbfaab98"
    }, {
        url: "/static/themes/one-light.min.css",
        revision: "f45fe48bc372c40ab745796df5dbfa8a"
    }, {
        url: "/static/themes/synthwave-84.min.css",
        revision: "4da31e65323a21b65b0b24159e542a11"
    }, {
        url: "/static/themes/verminal.min.css",
        revision: "5086166c49724d4a4117c1cac761709f"
    }], {
        ignoreURLParametersMatching: []
    }), e.cleanupOutdatedCaches(), e.registerRoute("/", new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [{
            cacheWillUpdate: async ({
                request: e,
                response: s,
                event: c,
                state: a
            }) => s && "opaqueredirect" === s.type ? new Response(s.body, {
                status: 200,
                statusText: "OK",
                headers: s.headers
            }) : s
        }]
    }), "GET"), e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i, new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3
        })]
    }), "GET"), e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i, new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800
        })]
    }), "GET"), e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i, new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800
        })]
    }), "GET"), e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i, new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute(/\/_next\/image\?url=.+$/i, new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute(/\.(?:mp3|wav|ogg)$/i, new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [new e.RangeRequestsPlugin, new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute(/\.(?:mp4)$/i, new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [new e.RangeRequestsPlugin, new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute(/\.(?:js)$/i, new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute(/\.(?:css|less)$/i, new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i, new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute(/\.(?:json|xml|csv)$/i, new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute((({
        url: e
    }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/")
    }), new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute((({
        url: e
    }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/")
    }), new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400
        })]
    }), "GET"), e.registerRoute((({
        url: e
    }) => !(self.origin === e.origin)), new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 3600
        })]
    }), "GET")
}));