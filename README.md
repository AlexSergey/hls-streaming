This is a test project - an attempt to create a universal video file converter to play any video format on the web.

This architecture is based on:

- HLS Streaming
- FFMPEG

## The Problem

At the moment, browser-based playback of video files is very limited. Many formats are not supported. There are also
restrictions on buffering and speed.

## The Idea

To solve the problem described above, you can create a client-server application. In which the server will convert video
files to the HLS format.

HLS Format is a universal format for playing video files in a browser with support for buffering and fast download and
processing speed.

## The Solution

On the server side, technologies are used:

- NestJS
- FFMPEG
- HLS
- WebSockets

The user uploads any video file. The server saves the source video file. The file is added to the processing queue.

The queue is only processing 1 file at the moment.

The queue sends the source to FFMPEG for conversion to HLS.

Upon successful conversion, the link to the HLS is returned to the client.
