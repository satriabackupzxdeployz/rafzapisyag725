export const SITE = {
  name: "RAFZ API",
  tagline: "REST API gratis untuk downloader, AI, search, dan automasi proyekmu.",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://api.rafztzy.eu.cc"
};

export const CONTACT = {
  whatsapp: "6282262921585",
  telegram: "rafztzy_real",
  email: "support@rafztzy.eu.cc"
};

export const CATEGORIES = [
  { slug:"d",  label:"Downloader",    folder:"/d",  icon:"folder-down",  description:"Unduh media dari TikTok, IG, YouTube, Spotify, SoundCloud, Pinterest, Twitter, dan banyak lagi." },
  { slug:"u",  label:"Uploader",      folder:"/u",  icon:"folder-up",    description:"Upload gambar, video, atau file dan dapatkan tautan publik dalam hitungan detik." },
  { slug:"ai", label:"AI Tools",      folder:"/ai", icon:"file-ai",      description:"Chat AI, generate gambar, terjemah teks, deteksi bug kode, dan berbagai alat kecerdasan buatan." },
  { slug:"s",  label:"Search Tools",  folder:"/s",  icon:"file-search",  description:"Cari lirik, chord gitar, lagu, berita, spesifikasi HP, drama, dan masih banyak lagi." },
  { slug:"t",  label:"Utility Tools", folder:"/t",  icon:"folder-tool",  description:"Alat pendukung: nslookup, TTS, code-to-image, upscale gambar, efek wasted, dan lainnya." }
];

const P = (name, example, required=true, type="string") => ({ name, required, type, example });

export const ENDPOINTS = [
  // ── DOWNLOADER ──────────────────────────────────────────────────────────
  { category:"d", slug:"ttmp4",     name:"TikTok → MP4",           method:"GET", path:"/d/ttmp4",
    description:"Unduh video TikTok tanpa watermark dalam format MP4.",
    params:[P("url","https://www.tiktok.com/@user/video/123456789")],
    sampleResult:{ title:"str", author:"str", thumbnail:"url", format:"mp4", download:"url" } },

  { category:"d", slug:"ttmp3",     name:"TikTok → MP3",           method:"GET", path:"/d/ttmp3",
    description:"Ekstrak audio dari video TikTok dalam format MP3.",
    params:[P("url","https://www.tiktok.com/@user/video/123456789")],
    sampleResult:{ title:"str", format:"mp3", download:"url" } },

  { category:"d", slug:"ttimg",     name:"TikTok → Thumbnail",     method:"GET", path:"/d/ttimg",
    description:"Ambil thumbnail/cover dari sebuah video TikTok.",
    params:[P("url","https://www.tiktok.com/@user/video/123456789")],
    sampleResult:{ title:"str", format:"jpg", download:"url" } },

  { category:"d", slug:"igmp4",     name:"Instagram → MP4",        method:"GET", path:"/d/igmp4",
    description:"Unduh reel atau video dari postingan Instagram publik.",
    params:[P("url","https://www.instagram.com/p/POST_ID")],
    sampleResult:{ username:"str", thumbnail:"url", format:"mp4", download:"url" } },

  { category:"d", slug:"igmp3",     name:"Instagram → Audio",      method:"GET", path:"/d/igmp3",
    description:"Ambil audio dari video postingan Instagram.",
    params:[P("url","https://www.instagram.com/p/POST_ID")],
    sampleResult:{ username:"str", format:"mp3", download:"url" } },

  { category:"d", slug:"igimg",     name:"Instagram → Foto",       method:"GET", path:"/d/igimg",
    description:"Unduh foto atau carousel dari postingan Instagram.",
    params:[P("url","https://www.instagram.com/p/POST_ID")],
    sampleResult:{ username:"str", format:"jpg", images:["url"] } },

  { category:"d", slug:"fbmp4",     name:"Facebook → MP4",         method:"GET", path:"/d/fbmp4",
    description:"Unduh video Facebook publik dalam kualitas HD atau SD.",
    params:[P("url","https://www.facebook.com/share/r/abc123")],
    sampleResult:{ thumbnail:"url", format:"mp4", download:"url" } },

  { category:"d", slug:"fbmp3",     name:"Facebook → Audio",       method:"GET", path:"/d/fbmp3",
    description:"Ambil audio dari video Facebook.",
    params:[P("url","https://www.facebook.com/share/r/abc123")],
    sampleResult:{ thumbnail:"url", format:"mp3", download:"url" } },

  { category:"d", slug:"fbimg",     name:"Facebook → Thumbnail",   method:"GET", path:"/d/fbimg",
    description:"Ambil thumbnail dari video atau postingan Facebook.",
    params:[P("url","https://www.facebook.com/share/r/abc123")],
    sampleResult:{ format:"jpg", download:"url" } },

  { category:"d", slug:"ytmp4",     name:"YouTube → MP4",          method:"GET", path:"/d/ytmp4",
    description:"Unduh video YouTube dengan pilihan kualitas.",
    params:[P("url","https://youtu.be/dQw4w9WgXcQ"), P("quality","720",false)],
    sampleResult:{ title:"str", duration:"str", thumbnail:"url", format:"mp4", download:"url" } },

  { category:"d", slug:"ytmp3",     name:"YouTube → MP3",          method:"GET", path:"/d/ytmp3",
    description:"Konversi video YouTube menjadi audio MP3.",
    params:[P("url","https://youtu.be/dQw4w9WgXcQ")],
    sampleResult:{ title:"str", duration:"str", thumbnail:"url", format:"mp3", download:"url" } },

  { category:"d", slug:"ytimg",     name:"YouTube → Thumbnail",    method:"GET", path:"/d/ytimg",
    description:"Ambil thumbnail resolusi tinggi dari video YouTube.",
    params:[P("url","https://youtu.be/dQw4w9WgXcQ")],
    sampleResult:{ title:"str", format:"jpg", download:"url" } },

  { category:"d", slug:"spmp3",     name:"Spotify → MP3",          method:"GET", path:"/d/spmp3",
    description:"Unduh lagu dari tautan Spotify dalam format MP3.",
    params:[P("url","https://open.spotify.com/track/TRACK_ID")],
    sampleResult:{ title:"str", artists:"str", cover:"url", format:"mp3", download:"url" } },

  { category:"d", slug:"sc",        name:"SoundCloud → MP3",       method:"GET", path:"/d/sc",
    description:"Unduh lagu dari SoundCloud dalam format MP3 dengan link langsung.",
    params:[P("url","https://soundcloud.com/artist/track")],
    sampleResult:{ title:"str", artist:"str", cover:"url", audio:"url" } },

  { category:"d", slug:"twitter",   name:"Twitter/X → MP4",        method:"GET", path:"/d/twitter",
    description:"Unduh video dari postingan Twitter atau X.",
    params:[P("url","https://twitter.com/user/status/123456789")],
    sampleResult:{ source:"url", video:"url" } },

  { category:"d", slug:"threads",   name:"Threads → Media",        method:"GET", path:"/d/threads",
    description:"Unduh foto atau video dari postingan Threads.",
    params:[P("url","https://www.threads.com/@user/post/POST_ID")],
    sampleResult:{ user:"str", preview:"url", download:"url" } },

  { category:"d", slug:"pinterest", name:"Pinterest → Media",      method:"GET", path:"/d/pinterest",
    description:"Unduh foto atau video dari pin Pinterest.",
    params:[P("url","https://pin.it/XXXXXXX")],
    sampleResult:{ title:"str", thumbnail:"url", media:[{ url:"url", quality:"str", type:"image" }] } },

  { category:"d", slug:"douyin",    name:"Douyin → MP4",           method:"GET", path:"/d/douyin",
    description:"Unduh video Douyin (TikTok China) tanpa watermark.",
    params:[P("url","https://v.douyin.com/XXXXXXX/")],
    sampleResult:{ title:"str", download:"url" } },

  { category:"d", slug:"terabox",   name:"TeraBox → File",         method:"GET", path:"/d/terabox",
    description:"Ambil link download langsung dari file TeraBox.",
    params:[P("url","https://www.terabox.com/sharing/link?surl=XXXXX")],
    sampleResult:{ status:"Success", files:[{ name:"str", download:"url", size:"str" }] } },

  { category:"d", slug:"mediafire", name:"MediaFire → File",       method:"GET", path:"/d/mediafire",
    description:"Ambil link download langsung dan info file dari MediaFire.",
    params:[P("url","https://www.mediafire.com/file/XXXXXXX/file")],
    sampleResult:{ title:"str", download:"url", size:"str", mimetype:"str" } },

  { category:"d", slug:"savevideo", name:"Universal Video DL",     method:"GET", path:"/d/savevideo",
    description:"Unduh video dari berbagai platform (Dailymotion, Vimeo, dll) secara universal.",
    params:[P("url","https://dai.ly/x9zi8s0")],
    sampleResult:{ title:"str", duration:"str", thumbnail:"url", formats:[{ url:"url", quality:"str" }] } },

  // ── UPLOADER ────────────────────────────────────────────────────────────
  { category:"u", slug:"img2url",  name:"Img2Url",   method:"POST", path:"/u/img2url",
    description:"Upload gambar dan dapatkan URL publik permanen.",
    body:[P("file","gambar.jpg",true,"file")],
    sampleResult:{ url:"url", name:"str", size:0, type:"image/jpeg" } },

  { category:"u", slug:"vid2url",  name:"Vid2Url",   method:"POST", path:"/u/vid2url",
    description:"Upload video dan dapatkan URL publik permanen.",
    body:[P("file","video.mp4",true,"file")],
    sampleResult:{ url:"url", name:"str", size:0, type:"video/mp4" } },

  { category:"u", slug:"file2url", name:"File2Url",  method:"POST", path:"/u/file2url",
    description:"Upload file apa pun ke Catbox dan dapatkan URL publik.",
    body:[P("file","dokumen.zip",true,"file")],
    sampleResult:{ url:"url", name:"str", size:0 } },

  // ── AI TOOLS ────────────────────────────────────────────────────────────
  { category:"ai", slug:"chat",     name:"AI Chat (HeckAI)",       method:"GET", path:"/ai/chat",
    description:"Chat dengan AI model Grok — respons dalam Bahasa Indonesia.",
    params:[P("text","Jelaskan apa itu REST API"), P("model","x-ai/grok-3-mini-beta",false)],
    sampleResult:{ model:"str", sessionId:"str", answer:"str" } },

  { category:"ai", slug:"gptchat",  name:"AI Chat (GPTAIChat)",    method:"GET", path:"/ai/gptchat",
    description:"Chat dengan AI berbasis GPT melalui engine gptaichat.org.",
    params:[P("text","Halo, siapa kamu?")],
    sampleResult:{ model:"str", content:"str" } },

  { category:"ai", slug:"venice",   name:"Venice AI (Uncensored)", method:"GET", path:"/ai/venice",
    description:"Chat dengan Venice AI model dolphin uncensored untuk respons tanpa filter.",
    params:[P("text","Siapa pahlawan dari Jawa Barat?"), P("model","dolphin-3.0-mistral-24b",false)],
    sampleResult:{ model:"str", answer:"str", references:[] } },

  { category:"ai", slug:"simsimi",  name:"SimiSimi Chat",          method:"GET", path:"/ai/simsimi",
    description:"Chat dengan karakter AI SimiSimi yang unik dan menghibur.",
    params:[P("text","Halo, apa kabar?")],
    sampleResult:{ answer:"str" } },

  { category:"ai", slug:"gemini",   name:"Gemini AI",              method:"GET", path:"/ai/gemini",
    description:"Chat dengan model Google Gemini (Flash 2.5 dan 3.0).",
    params:[P("text","Ceritakan tentang Jakarta"), P("model","gemini-3-flash-preview",false)],
    sampleResult:{ model:"str", answer:"str" } },

  { category:"ai", slug:"image",    name:"Text to Image (Flux)",   method:"GET", path:"/ai/image",
    description:"Hasilkan gambar dari deskripsi teks menggunakan model Flux.",
    params:[P("prompt","neon samurai in the rain"), P("ratio","1:1",false)],
    sampleResult:{ prompt:"str", ratio:"1:1", image:"url" } },

  { category:"ai", slug:"deepimg",  name:"DeepImg (Flux-1 Dev)",   method:"GET", path:"/ai/deepimg",
    description:"Generate gambar berkualitas tinggi dengan model Flux-1 Dev dari DeepImg.",
    params:[P("prompt","futuristic city at night 8k")],
    sampleResult:{ prompt:"str", model:"flux-1-dev", image:"url" } },

  { category:"ai", slug:"code",     name:"Code AI",                method:"GET", path:"/ai/code",
    description:"Buat kode dari prompt, deteksi bug, konversi bahasa, atau jelaskan kode. Gunakan ?action=prompt/detect/convert/explain.",
    params:[
      P("action","prompt"),
      P("prompt","buat fungsi sorting bubble sort",false),
      P("lang","javascript",false),
      P("code","function x(){...}",false),
      P("target","python",false)
    ],
    sampleResult:{ title:"str", language:"str", code:"str", explanation:"str" } },

  { category:"ai", slug:"translate", name:"AI Translate & Summarize", method:"GET", path:"/ai/translate",
    description:"Terjemahkan, ringkas, atau parafrase teks dengan AI. Mode: TRANSLATE, SUMMARIZE, PARAPHRASE.",
    params:[P("text","Halo apa kabar?"), P("mode","TRANSLATE",false), P("to","English",false)],
    sampleResult:{ module:"str", input:"str", output:"str" } },

  // ── SEARCH TOOLS ────────────────────────────────────────────────────────
  { category:"s", slug:"lyrics",      name:"Cari Lirik Lagu",       method:"GET", path:"/s/lyrics",
    description:"Cari lirik lagu berdasarkan judul atau nama artis.",
    params:[P("q","Lathi Weird Genius")],
    sampleResult:{ title:"str", artist:"str", album:"str", duration:"str", lyrics:"str" } },

  { category:"s", slug:"chord",       name:"Cari Chord Gitar",      method:"GET", path:"/s/chord",
    description:"Cari chord gitar lagu dari Gitagram berdasarkan judul atau artis.",
    params:[P("q","Peterpan Ada Apa Denganmu")],
    sampleResult:[{ title:"str", artist:"str", url:"url" }] },

  { category:"s", slug:"wiki",        name:"Wikipedia Search",      method:"GET", path:"/s/wiki",
    description:"Cari dan ambil ringkasan artikel Wikipedia Bahasa Indonesia.",
    params:[P("q","Kota Bandung")],
    sampleResult:{ title:"str", url:"url", summary:"str" } },

  { category:"s", slug:"ttstalk",     name:"TikTok Stalk",          method:"GET", path:"/s/ttstalk",
    description:"Lihat profil dan video terbaru akun TikTok publik.",
    params:[P("username","tiktok")],
    sampleResult:{ username:"str", followers:0, following:0, likes:0, videos:[] } },

  { category:"s", slug:"ttsearch",    name:"Cari Video TikTok",     method:"GET", path:"/s/ttsearch",
    description:"Cari video TikTok berdasarkan kata kunci, lengkap dengan link download tanpa watermark.",
    params:[P("q","story wa sad"), P("count","12",false)],
    sampleResult:[{ id:"str", title:"str", cover:"url", author:{ username:"str" }, media:{ noWatermark:"url" } }] },

  { category:"s", slug:"scsearch",    name:"Cari Lagu SoundCloud",  method:"GET", path:"/s/scsearch",
    description:"Cari lagu di SoundCloud berdasarkan judul atau artis.",
    params:[P("q","Dewa 19 Kangen")],
    sampleResult:[{ title:"str", artist:"str", url:"url" }] },

  { category:"s", slug:"songfinder",  name:"Song Finder (FLAC)",    method:"GET", path:"/s/songfinder",
    description:"Temukan lagu dengan info Spotify ID dan cover art berkualitas tinggi.",
    params:[P("q","terpaksa")],
    sampleResult:[{ name:"str", artists:"str", album:"str", spotifyId:"str", cover:"url" }] },

  { category:"s", slug:"cnnnews",     name:"Berita CNN Indonesia",  method:"GET", path:"/s/cnnnews",
    description:"Ambil daftar berita terbaru dari CNN Indonesia.",
    params:[],
    sampleResult:[{ title:"str", url:"url", image:"url", category:"str" }] },

  { category:"s", slug:"gsmarena",    name:"Cari Spek HP (GSMArena)",method:"GET", path:"/s/gsmarena",
    description:"Cari spesifikasi smartphone dari database GSMArena.",
    params:[P("q","Samsung Galaxy S25")],
    sampleResult:{ hits:[{ modelName:"str", img:"url", url:"url" }] } },

  { category:"s", slug:"dramasearch", name:"Cari Drama",            method:"GET", path:"/s/dramasearch",
    description:"Cari judul drama dari DramaBox berdasarkan kata kunci.",
    params:[P("q","CEO"), P("lang","in",false)],
    sampleResult:[{ title:"str", cover:"url", type:"str" }] },

  // ── UTILITY TOOLS ───────────────────────────────────────────────────────
  { category:"t", slug:"nslookup",   name:"NS Lookup",              method:"GET", path:"/t/nslookup",
    description:"Periksa informasi webserver dan DNS dari sebuah domain.",
    params:[P("domain","google.com")],
    sampleResult:{ domain:"str", records:{} } },

  { category:"t", slug:"tts",        name:"Text to Speech",         method:"GET", path:"/t/tts",
    description:"Ubah teks menjadi audio suara dalam format MP3.",
    params:[P("text","Selamat datang di RAFZ API")],
    sampleResult:{ text:"str", audio:"url" } },

  { category:"t", slug:"code2img",   name:"Code to Image",          method:"GET", path:"/t/code2img",
    description:"Ubah cuplikan kode menjadi gambar PNG siap dibagikan. Mengembalikan file PNG langsung.",
    params:[P("code","console.log('Hello RAFZ')"), P("lang","javascript",false), P("theme","seti",false)],
    responseType:"image" },

  { category:"t", slug:"imgupscale", name:"Image Upscaler (AI)",    method:"POST", path:"/t/imgupscale",
    description:"Perbesar resolusi gambar 2x atau 4x menggunakan AI. Upload gambar via form-data.",
    body:[P("file","gambar.jpg",true,"file"), P("scale","2",false,"string")],
    sampleResult:{ scale:2, result:"url" } },

  { category:"t", slug:"wasted",     name:"Wasted Effect (GTA)",    method:"GET", path:"/t/wasted",
    description:"Tambahkan efek 'WASTED' ala GTA pada foto. Masukkan URL gambar/avatar.",
    params:[P("url","https://files.catbox.moe/example.jpg")],
    sampleResult:{ avatar:"url", result:"url" } }
];

export function getEndpointsByCategory(slug) { return ENDPOINTS.filter(e => e.category === slug); }
export function getCategory(slug) { return CATEGORIES.find(c => c.slug === slug); }
export function getEndpoint(cat, slug) { return ENDPOINTS.find(e => e.category === cat && e.slug === slug); }
