interface Song {
  title: string;
  artist: string;
}

interface MomentCollection {
  name: string;
  wines: {
    type: string;
    songs: Song[];
  }[];
}

export const songLists: MomentCollection[] = [
  {
    name: "Cena",
    wines: [
      {
        type: "Vino Tinto",
        songs: [
          { title: "Fly Me to the Moon", artist: "Frank Sinatra" },
          { title: "Come Away With Me", artist: "Norah Jones" },
          { title: "The Look of Love", artist: "Diana Krall" },
          { title: "Feeling Good", artist: "Michael Bublé" },
          { title: "Summertime", artist: "Ella Fitzgerald" },
          { title: "Unforgettable", artist: "Nat King Cole" },
          { title: "I Left My Heart in San Francisco", artist: "Tony Bennett" },
          { title: "Blue Moon", artist: "Billie Holiday" },
          { title: "What a Wonderful World", artist: "Louis Armstrong" },
          { title: "Ain't That a Kick in the Head", artist: "Dean Martin" },
          { title: "Garota de Ipanema", artist: "Antônio Carlos Jobim" },
          { title: "Águas de Março", artist: "João Gilberto" },
          { title: "Sodade", artist: "Cesária Évora" },
          { title: "Samba da Bênção", artist: "Bebel Gilberto" },
          { title: "The Girl from Ipanema", artist: "Astrud Gilberto" }
        ]
      },
      {
        type: "Vino Blanco",
        songs: [
          { title: "Nuvole Bianche", artist: "Ludovico Einaudi" },
          { title: "Bach: Cello Suite No. 1", artist: "Yo-Yo Ma" },
          { title: "Only Time", artist: "Enya" },
          { title: "On the Nature of Daylight", artist: "Max Richter" },
          { title: "Comptine d'un autre été", artist: "Yann Tiersen" },
          { title: "Clair de Lune", artist: "Debussy" },
          { title: "Nocturne in E-flat Major, Op. 9 No. 2", artist: "Chopin" },
          { title: "Gymnopédie No. 1", artist: "Satie" },
          { title: "Metamorphosis Two", artist: "Philip Glass" },
          { title: "Spiegel im Spiegel", artist: "Arvo Pärt" },
          { title: "Don't Know Why", artist: "Norah Jones" },
          { title: "Let's Fall in Love", artist: "Diana Krall" },
          { title: "La Vie en Rose", artist: "Madeleine Peyroux" },
          { title: "My One and Only Thrill", artist: "Melody Gardot" },
          { title: "The Closest Thing to Crazy", artist: "Katie Melua" }
        ]
      },
      {
        type: "Vino Rosado",
        songs: [
          { title: "Banana Pancakes", artist: "Jack Johnson" },
          { title: "Ho Hey", artist: "The Lumineers" },
          { title: "Mess Is Mine", artist: "Vance Joy" },
          { title: "Steal My Kisses", artist: "Ben Harper" },
          { title: "Lucky", artist: "Jason Mraz ft. Colbie Caillat" },
          { title: "Sunrise", artist: "Norah Jones" },
          { title: "Trouble Sleeping", artist: "Corinne Bailey Rae" },
          { title: "The Way I Am", artist: "Ingrid Michaelson" },
          { title: "Bloom", artist: "The Paper Kites" },
          { title: "Little Talks", artist: "Of Monsters and Men" },
          { title: "Home", artist: "Edward Sharpe & The Magnetic Zeros" },
          { title: "I Will Wait", artist: "Mumford & Sons" },
          { title: "Rivers and Roads", artist: "The Head and the Heart" },
          { title: "Emmylou", artist: "First Aid Kit" },
          { title: "Poison & Wine", artist: "The Civil Wars" }
        ]
      }
    ]
  },
  {
    name: "Relajación",
    wines: [
      {
        type: "Vino Tinto",
        songs: [
          { title: "Caribbean Blue", artist: "Enya" },
          { title: "Adagio in C Minor", artist: "Yanni" },
          { title: "Colors/Dance", artist: "George Winston" },
          { title: "On the Nature of Daylight", artist: "Max Richter" },
          { title: "Ambient 1: Music for Airports", artist: "Brian Eno" },
          { title: "Sæglópur", artist: "Sigur Rós" },
          { title: "Says", artist: "Nils Frahm" },
          { title: "Saman", artist: "Ólafur Arnalds" },
          { title: "Merry Christmas Mr. Lawrence", artist: "Ryuichi Sakamoto" },
          { title: "The Morning Fog", artist: "Kate Bush" },
          { title: "Blue in Green", artist: "Miles Davis" },
          { title: "Naima", artist: "John Coltrane" },
          { title: "Waltz for Debby", artist: "Bill Evans" },
          { title: "Maiden Voyage", artist: "Herbie Hancock" },
          { title: "Round Midnight", artist: "Thelonious Monk" }
        ]
      },
      {
        type: "Vino Blanco",
        songs: [
          { title: "Clair de Lune", artist: "Debussy" },
          { title: "Nocturne in E-flat Major, Op. 9 No. 2", artist: "Chopin" },
          { title: "Gymnopédie No. 1", artist: "Satie" },
          { title: "Metamorphosis Two", artist: "Philip Glass" },
          { title: "Spiegel im Spiegel", artist: "Arvo Pärt" },
          { title: "Nuvole Bianche", artist: "Ludovico Einaudi" },
          { title: "Bach: Cello Suite No. 1", artist: "Yo-Yo Ma" },
          { title: "Only Time", artist: "Enya" },
          { title: "On the Nature of Daylight", artist: "Max Richter" },
          { title: "Comptine d'un autre été", artist: "Yann Tiersen" },
          { title: "Hoppípolla", artist: "Sigur Rós" },
          { title: "Says", artist: "Nils Frahm" },
          { title: "Saman", artist: "Ólafur Arnalds" },
          { title: "Merry Christmas Mr. Lawrence", artist: "Ryuichi Sakamoto" },
          { title: "The Morning Fog", artist: "Kate Bush" }
        ]
      },
      {
        type: "Vino Rosado",
        songs: [
          { title: "Banana Pancakes", artist: "Jack Johnson" },
          { title: "Ho Hey", artist: "The Lumineers" },
          { title: "Mess Is Mine", artist: "Vance Joy" },
          { title: "Steal My Kisses", artist: "Ben Harper" },
          { title: "Lucky", artist: "Jason Mraz ft. Colbie Caillat" },
          { title: "Sunrise", artist: "Norah Jones" },
          { title: "Trouble Sleeping", artist: "Corinne Bailey Rae" },
          { title: "The Way I Am", artist: "Ingrid Michaelson" },
          { title: "Bloom", artist: "The Paper Kites" },
          { title: "Little Talks", artist: "Of Monsters and Men" },
          { title: "Home", artist: "Edward Sharpe & The Magnetic Zeros" },
          { title: "I Will Wait", artist: "Mumford & Sons" },
          { title: "Rivers and Roads", artist: "The Head and the Heart" },
          { title: "My Silver Lining", artist: "First Aid Kit" },
          { title: "Poison & Wine", artist: "The Civil Wars" }
        ]
      }
    ]
  },
  {
    name: "Celebración",
    wines: [
      {
        type: "Vino Tinto",
        songs: [
          { title: "September", artist: "Earth, Wind & Fire" },
          { title: "Superstition", artist: "Stevie Wonder" },
          { title: "I Want You Back", artist: "The Jackson 5" },
          { title: "Get Up Offa That Thing", artist: "James Brown" },
          { title: "Respect", artist: "Aretha Franklin" },
          { title: "Celebration", artist: "Kool & The Gang" },
          { title: "Le Freak", artist: "Chic" },
          { title: "We Are Family", artist: "Sister Sledge" },
          { title: "Love Train", artist: "The O'Jays" },
          { title: "Let's Groove", artist: "Earth, Wind & Fire" },
          { title: "1999", artist: "Prince" },
          { title: "Billie Jean", artist: "Michael Jackson" },
          { title: "My Girl", artist: "The Temptations" },
          { title: "Ain't No Mountain High Enough", artist: "Marvin Gaye" },
          { title: "You Can't Hurry Love", artist: "The Supremes" }
        ]
      },
      {
        type: "Vino Blanco",
        songs: [
          { title: "Mamma Mia", artist: "ABBA" },
          { title: "Night Fever", artist: "Bee Gees" },
          { title: "Never Can Say Goodbye", artist: "Gloria Gaynor" },
          { title: "Jump (For My Love)", artist: "The Pointer Sisters" },
          { title: "Last Dance", artist: "Donna Summer" },
          { title: "September", artist: "Earth, Wind & Fire" },
          { title: "Signed, Sealed, Delivered I'm Yours", artist: "Stevie Wonder" },
          { title: "ABC", artist: "The Jackson 5" },
          { title: "I Got You (I Feel Good)", artist: "James Brown" },
          { title: "Think", artist: "Aretha Franklin" },
          { title: "Get Down On It", artist: "Kool & The Gang" },
          { title: "Good Times", artist: "Chic" },
          { title: "He's the Greatest Dancer", artist: "Sister Sledge" },
          { title: "I Love Music", artist: "The O'Jays" },
          { title: "Fantasy", artist: "Earth, Wind & Fire" }
        ]
      },
      {
        type: "Vino Rosado",
        songs: [
          { title: "Happy", artist: "Pharrell Williams" },
          { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
          { title: "Hey Ya!", artist: "OutKast" },
          { title: "Can't Stop the Feeling!", artist: "Justin Timberlake" },
          { title: "Get Lucky", artist: "Daft Punk ft. Pharrell Williams" },
          { title: "Dancing Queen", artist: "ABBA" },
          { title: "Stayin' Alive", artist: "Bee Gees" },
          { title: "I Will Survive", artist: "Gloria Gaynor" },
          { title: "I'm So Excited", artist: "The Pointer Sisters" },
          { title: "Hot Stuff", artist: "Donna Summer" },
          { title: "September", artist: "Earth, Wind & Fire" },
          { title: "Superstition", artist: "Stevie Wonder" },
          { title: "I Want You Back", artist: "The Jackson 5" },
          { title: "Get Up Offa That Thing", artist: "James Brown" },
          { title: "Respect", artist: "Aretha Franklin" }
        ]
      }
    ]
  },
  {
    name: "Fiesta",
    wines: [
      {
        type: "Vino Tinto",
        songs: [
          { title: "Hips Don't Lie", artist: "Shakira" },
          { title: "Give Me Everything", artist: "Pitbull ft. Ne-Yo" },
          { title: "On the Floor", artist: "Jennifer Lopez" },
          { title: "Gasolina", artist: "Daddy Yankee" },
          { title: "Mi Gente", artist: "J Balvin" },
          { title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee" },
          { title: "Safaera", artist: "Bad Bunny" },
          { title: "Hawái", artist: "Maluma" },
          { title: "Tusa", artist: "Karol G" },
          { title: "Taki Taki", artist: "Ozuna" },
          { title: "Feel So Close", artist: "Calvin Harris" },
          { title: "Titanium", artist: "David Guetta ft. Sia" },
          { title: "Levels", artist: "Avicii" },
          { title: "Closer", artist: "The Chainsmokers" },
          { title: "Stay", artist: "Zedd ft. Alessia Cara" }
        ]
      },
      {
        type: "Vino Blanco",
        songs: [
          { title: "Feel So Close", artist: "Calvin Harris" },
          { title: "Titanium", artist: "David Guetta ft. Sia" },
          { title: "Levels", artist: "Avicii" },
          { title: "Closer", artist: "The Chainsmokers" },
          { title: "Stay", artist: "Zedd ft. Alessia Cara" },
          { title: "Just Dance", artist: "Lady Gaga" },
          { title: "Single Ladies (Put a Ring on It)", artist: "Beyoncé" },
          { title: "Don't Stop the Music", artist: "Rihanna" },
          { title: "Firework", artist: "Katy Perry" },
          { title: "24K Magic", artist: "Bruno Mars" },
          { title: "One Dance", artist: "Drake" },
          { title: "Blinding Lights", artist: "The Weeknd" },
          { title: "Don't Start Now", artist: "Dua Lipa" },
          { title: "Bad Guy", artist: "Billie Eilish" },
          { title: "Circles", artist: "Post Malone" }
        ]
      },
      {
        type: "Vino Rosado",
        songs: [
          { title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee" },
          { title: "Safaera", artist: "Bad Bunny" },
          { title: "Hawái", artist: "Maluma" },
          { title: "Tusa", artist: "Karol G" },
          { title: "Taki Taki", artist: "Ozuna" },
          { title: "Hips Don't Lie", artist: "Shakira" },
          { title: "Give Me Everything", artist: "Pitbull ft. Ne-Yo" },
          { title: "On the Floor", artist: "Jennifer Lopez" },
          { title: "Gasolina", artist: "Daddy Yankee" },
          { title: "Mi Gente", artist: "J Balvin" },
          { title: "Feel So Close", artist: "Calvin Harris" },
          { title: "Titanium", artist: "David Guetta ft. Sia" },
          { title: "Levels", artist: "Avicii" },
          { title: "Closer", artist: "The Chainsmokers" },
          { title: "Stay", artist: "Zedd ft. Alessia Cara" }
        ]
      }
    ]
  },
  {
    name: "Romántico",
    wines: [
      {
        type: "Vino Tinto",
        songs: [
          { title: "Perfect", artist: "Ed Sheeran" },
          { title: "All of Me", artist: "John Legend" },
          { title: "At Last", artist: "Etta James" },
          { title: "Let's Get It On", artist: "Marvin Gaye" },
          { title: "If I Ain't Got You", artist: "Alicia Keys" },
          { title: "Someone Like You", artist: "Adele" },
          { title: "Marry You", artist: "Bruno Mars" },
          { title: "Stay With Me", artist: "Sam Smith" },
          { title: "Say You Won't Let Go", artist: "James Arthur" },
          { title: "A Thousand Years", artist: "Christina Perri" },
          { title: "La Vie en Rose", artist: "Louis Armstrong" },
          { title: "The Way You Look Tonight", artist: "Frank Sinatra" },
          { title: "Lullaby of Birdland", artist: "Ella Fitzgerald" },
          { title: "The Lady Is a Tramp", artist: "Tony Bennett & Lady Gaga" },
          { title: "That's Amore", artist: "Dean Martin" }
        ]
      },
      {
        type: "Vino Blanco",
        songs: [
          { title: "Your Song", artist: "Elton John" },
          { title: "Can't Get Enough of Your Love, Babe", artist: "Barry White" },
          { title: "I Will Always Love You", artist: "Whitney Houston" },
          { title: "Endless Love", artist: "Lionel Richie & Diana Ross" },
          { title: "It's All Coming Back to Me Now", artist: "Celine Dion" },
          { title: "Perfect", artist: "Ed Sheeran" },
          { title: "All of Me", artist: "John Legend" },
          { title: "At Last", artist: "Etta James" },
          { title: "Let's Get It On", artist: "Marvin Gaye" },
          { title: "If I Ain't Got You", artist: "Alicia Keys" },
          { title: "Someone Like You", artist: "Adele" },
          { title: "Marry You", artist: "Bruno Mars" },
          { title: "Stay With Me", artist: "Sam Smith" },
          { title: "Say You Won't Let Go", artist: "James Arthur" },
          { title: "A Thousand Years", artist: "Christina Perri" }
        ]
      },
      {
        type: "Vino Rosado",
        songs: [
          { title: "Someone Like You", artist: "Adele" },
          { title: "Marry You", artist: "Bruno Mars" },
          { title: "Stay With Me", artist: "Sam Smith" },
          { title: "Say You Won't Let Go", artist: "James Arthur" },
          { title: "A Thousand Years", artist: "Christina Perri" },
          { title: "Perfect", artist: "Ed Sheeran" },
          { title: "All of Me", artist: "John Legend" },
          { title: "At Last", artist: "Etta James" },
          { title: "Let's Get It On", artist: "Marvin Gaye" },
          { title: "If I Ain't Got You", artist: "Alicia Keys" },
          { title: "La Vie en Rose", artist: "Louis Armstrong" },
          { title: "The Way You Look Tonight", artist: "Frank Sinatra" },
          { title: "Lullaby of Birdland", artist: "Ella Fitzgerald" },
          { title: "The Lady Is a Tramp", artist: "Tony Bennett & Lady Gaga" },
          { title: "That's Amore", artist: "Dean Martin" }
        ]
      }
    ]
  }
]; 