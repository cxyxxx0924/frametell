# A token bucket

Technology. About 60 seconds. Styles: tech-dark, then whiteboard.

A public one-line request for this subject, which also asks for every frame to be a pure function of time, is [here](https://x.com/ParkerRex/status/2103206747846701462). This note is the explanation.

- A bucket holds at most B tokens. New tokens arrive at a rate r per second. Any token that would take the bucket past B is discarded.
- A request spends one token. If a token is there, the request goes through and the token is removed. If the bucket is empty, the request waits or is refused.
- The film may show this case: B is 10 and r is 5 per second. After a quiet stretch the bucket sits at 10. A burst may spend all 10 at once. After that, requests go through at 5 a second, while the bucket refills.
- A leaky bucket is a different mechanism. Do not draw this one as that.

One bucket. Tokens drop in, a burst takes a handful, then a steady stream leaves at the rate the bucket refills.
