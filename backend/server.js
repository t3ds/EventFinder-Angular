const express = require('express');
const axios = require('axios');
const app = express();
const CORS = require("cors");
var geohash = require('ngeohash');
var SpotifyWebApi = require('spotify-web-api-node');
const port = process.env.PORT || 5000
// const apikey = 'JkmJpKYdrPK2RAbotuKq3aXe3zEQxcUn'
const apikey = '#API'
var spotifyApi = new SpotifyWebApi({
    clientId: '#KEY',
    clientSecret: '#KEY',
})


app.use(CORS())
app.set("trust proxy", true)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/suggestions', async (req, res) => {

    const uri = `https://app.ticketmaster.com/discovery/v2/suggest?apikey=${apikey}&keyword=${req.query.keyword}`
    //console.log(uri)
    const respomse = await axios.get(uri)

    //console.log(respomse.data)
    res.json({
        data:respomse.data
    })
    
})

app.get('/events', async(req,res) => {

    segments = {
        "default": "",
        "music": "KZFzniwnSyZfZ7v7nJ",
        "sports": "KZFzniwnSyZfZ7v7nE",
        "arts": "KZFzniwnSyZfZ7v7na",
        "film": "KZFzniwnSyZfZ7v7nn",
        "miscellaneous": "KZFzniwnSyZfZ7v7n1"
    }

    let coords = req.query.geopoint.split(',')
    
    geoPoint = geohash.encode(coords[0] * 1, coords[1]* 1)
    //console.log(geoPoint)
    //console.log(geohash.decode(geoPoint))
    const uri = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&keyword=${req.query.keyword}&segmentId=${segments[req.query.segment]}&radius=${req.query.radius}&unit=miles&geoPoint=${geoPoint}`
    console.log(uri)

    const response = await axios.get(uri)
    console.log(response.data)
    res.json({
        data:response.data
    })
})

app.get('/eventdetails', async (req,res) =>{
    const uri = `https://app.ticketmaster.com/discovery/v2/events/${req.query.id}?apikey=${apikey}`

    const response = await axios.get(uri)
    console.log(response.data)
    res.json({
        data:response.data
    })
})

app.get('/venuedetails', async (req,res) =>{
    const uri = `https://app.ticketmaster.com/discovery/v2/venues?apikey=${apikey}&keyword=${req.query.keyword}`

    const response = await axios.get(uri)
    console.log(response.data)
    res.json({
        data:response.data
    })
})

app.get('/artistinfo', async (req,res) =>{
    let artistDisplay = JSON.parse(req.query.artistDisplay)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(artistDisplay)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    let finalfinalData = []
    try{
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(artistDisplay)
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        for(let artist in artistDisplay){
            console.log(artist, artistDisplay[artist])
        const data = await spotifyApi.clientCredentialsGrant();
        console.log("access toekn : " + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
        const response = await spotifyApi.searchArtists(artistDisplay[artist]);
        console.log(response['body']);

        const albums = await spotifyApi.getArtistAlbums(response.body.artists.items[0].id, {limit:3});
        let finalData = response['body'].artists.items[0];
        finalData['albums'] = albums['body']
       finalfinalData.push(finalData)
       
        }
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(finalfinalData)
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        res.json({
            data:finalfinalData
        });
    }
    catch(err){
            console.log(err)
    }
    
    // try{
    //     const data = await spotifyApi.clientCredentialsGrant();
    //     console.log("access toekn : " + data.body['access_token']);
    //     spotifyApi.setAccessToken(data.body['access_token']);
    //     const response = await spotifyApi.searchArtists(req.query.name);
    //     console.log(response['body']);

    //     const albums = await spotifyApi.getArtistAlbums(response.body.artists.items[0].id, {limit:3});
    //     let finalData = response['body'].artists.items[0];
    //     finalData['albums'] = albums['body']
    //     res.json({
    //         data:finalData
    //     });

    // }

    // catch(err){
    //     console.log(err);
    // }

    
})

