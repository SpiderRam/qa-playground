import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined'

import fireflyImage from '../Images/firefly.jpeg'
import wingspanImage from '../Images/3d-wingspan-1024x1002.png'
import marsImage from '../Images/mars.jpeg'
import ascensionImage from '../Images/ascension.webp'
import bobRossImage from '../Images/bob_ross.jpeg'
import catLadyImage from '../Images/Cat-Lady-Max-Quality.webp'

const gameObjects = [
  {
    icon: <RocketLaunchOutlinedIcon />,
    name: 'Firefly',
    value: null,
    image: fireflyImage,
    blurb:
      "Players captain their own Firefly-class transport ship, traveling the 'Verse with a handpicked crew of fighters, mechanics and other travelers. As a captain desperate for work, players are compelled to take on any job — so long as it pays. Double-dealing employers, heavy-handed Alliance patrols, and marauding Reavers are all in a day's work for a ship's captain at the edge of the 'Verse.",
  },
  {
    icon: <ParkOutlinedIcon />,
    name: 'Wingspan',
    value: null,
    image: wingspanImage,
    blurb:
      'You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves. Each bird extends a chain of powerful combinations in one of your habitats (actions).',
  },
  {
    icon: <LanguageOutlinedIcon />,
    name: 'Terraforming Mars',
    value: null,
    image: marsImage,
    blurb:
      'In the 2400s, mankind begins to terraform the planet Mars. Giant corporations, sponsored by the World Government on Earth, initiate huge projects to raise the temperature, the oxygen level, and the ocean coverage until the environment is habitable. In Terraforming Mars, you play one of those corporations and work together in the terraforming process, but compete for getting victory points that are awarded not only for your contribution to the terraforming, but also for advancing human infrastructure throughout the solar system, and doing other commendable things.',
  },
  {
    icon: <ShieldOutlinedIcon />,
    name: 'Ascension',
    value: null,
    image: ascensionImage,
    blurb:
      'Ascension is a deck-building game in which players spend Runes to acquire more powerful cards for their deck. It offers a dynamic play experience where players have to react and adjust their strategy accordingly. Each player starts with a small deck of cards, and uses those cards to acquire more and better cards for their deck, with the goal of earning the most Honor Points by gaining cards and defeating monsters.',
  },
  {
    icon: <PaletteOutlinedIcon />,
    name: 'Bob Ross',
    value: null,
    image: bobRossImage,
    blurb:
      'If you want to paint with Bob Ross, you need to be chill, so whoever reaches maximum chill first in Bob Ross: Art of Chill Game wins.',
  },
  {
    icon: <PetsOutlinedIcon />,
    name: 'Cat Lady',
    value: null,
    image: catLadyImage,
    blurb:
      'You and your fellow cat ladies will draft cards three at a time, collecting toys, food, catnip, costumes, and of course lovable cats. But watch out! Make sure you have enough food for all of your feline friends or your hungry cats will subtract points from your score.',
  },
]

export default gameObjects
