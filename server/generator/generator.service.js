'use strict';

var mongoose = require('mongoose');
var User = require('../api/user/user.model');

var verbs = [
  'throw'
  ,'eat'
  ,'shoot'
  ,'turn into'
  ,'inadequately describe'
  ,'perfectly outline'
  ,'speak the language of'
  ,'read the mind of'
  ,'dress up as'
  ,'congratulate'
  ,'teleport'
  ,'remember the birthday of'
  ,'bitch about Monsanto to'
  ,'drunkenly dance with'
  ,'twerk on top of'
  ,'make racially insensitive jokes about'
  ,'tryst and cavort with'
  ,'accidentally use your ex\'s name instead of'
  ,'blaspheme using depictions of'
  ,'pee on'
  ,'make people believe anything you say about'
  ,'fantasize about'
  ,'instantly disintegrate'
  ,'imitate'
  ,'dance on the grave of'
  ,'politely decline the advances of'
  ,'anti-vaxx the shit out of'
  ,'anthropomorphize'
  ,'unleash the'
  ,'get shot by'
  ,'double the size of'
  ,'turn a frog into'
  ,'immediately win the affection of'
  ,'have approximate knowledge of'
  ,'rewind time, but only for'
  ,'recreate the nativity scene of'
  ,'abhor'
  ,'like'
  ,'pretend to like'
  ,'want to strangle'
  ,'know the exact location of'
]

var nouns = [
  'abandoned babies'
  ,'red hot lasers'
  ,'Hershey stains'
  ,'all human beings'
  ,'perverted porpoises'
  ,'Uncle Tom'
  ,'a used cucumber'
  ,'Sarah Michelle Gellar'
  ,'Awkward Seal'
  ,'the Holy Hand Grenade'
  ,'Private Ryan'
  ,'toilet paper'
  ,'the Hunger Games Trilogy'
  ,'Stephenie Meyer\'s glitter fetish'
  ,'a drunk cheerleader'
  ,'Dikshit, India'
  ,'unmarked cop cars'
  ,'impolite Victorian Englishwomen'
  ,'Morgan Freeman\'s salty curls'
  ,'Russell Crowe\'s mean left hook'
  ,'PATRIOTISM'
  ,'priapism'
  ,'Humans of New York'
  ,'uncomfortably personal fanfiction'
  ,'Rob Ford\'s tighty whities'
  ,'Miyazaki\'s really, truly last film'
  ,'Pokemon'
  ,'that fucking Oscar Meyer song'
  ,'morning wood'
  ,'Sarah Palin'
  ,'Sesame Street (Zombie Edition)'
  ,'Captain Jack Sparrow'
  ,'the Quebecois'
  ,'my lion of Lannister'
  ,'Cersei\'s tits'
  ,'the FIFA 2015 Women\'s World Cup champions'
  ,'Alex Morgan\'s heart-rending perfection'
  ,'the sexy, sexy Greek gods'
  ,'Apollo 13'
  ,'pre-op Caitlyn Jenner'
  ,'Kim Kardashian\'s booty'
  ,'Black Friday'
  ,'miscellaneous gigolos'
  ,'Anna Kendrick\'s smile'
  ,'Steve Buscemi\'s smile'
  ,'pre-coke Macaulay Culkin'
  ,'an enema'
  ,'piss-poor performance'
  ,'Jabba the Hutt'
  ,'slave Leia'
  ,'improper running attire'
  ,'Chris Hemsworth\'s rippling pecs'
  ,'Pikachu'
  ,'Puff the Magic Dragon'
  ,'Snoop Lion'
  ,'poor hygeine'
  ,'McDonald\'s fries'
  ,'Mona Lisa\'s cleavage'
  ,'a street urchin'
  ,'the Gingerbread Man'
]

var modifiers = [
  ' without ever having seen them'
  ,' while brushing your teeth with vinegar'
  ,', but only while naked'
  ,', but it makes your clothes invisible'
  ,', but only while singing Singing in the Rain like in a Clockwork Orange'
  ,' whenever your bladder is full'
  ,' whenever you watch Full House'
  ,' as if your life depended on it'
  ,' in bed, if you know what I mean'
  ,' in bed, if you know what I mean'
  ,' in bed'
  ,' in bed'
  ,' in bed'
  ,' in bed'
  ,' in bed'
  ,' while unsafely double-bagging your condom'
  ,' from your subpar hideout'
  ,', even though you\'ve already given up your secret identity'
  ,' when the Pope visits'
  ,' whilst I look on'
  ,' from your parent\'s bed'
  ,' while remembering your most embarassing childhood moments'
  ,' without any regard for public safety'
  ,' , which is a pretty shitty superpower to be honest'
  ,', which seems useless until you consider its implications in the porn industry'
  ,', but only between the time you hit puberty and the first time you have sex'
  ,', but at the cost of extreme body odor'
  ,', but only after you\'re dead'
  ,' while speaking in riddles'
  ,', but mixing up your Vs and Ws'
  ,' in a harsh German accent'
  ,' during the running of the bulls'
  ,' while rapping Eminem\'s early work'
  ,', which seems useless until you consider your dream of becoming the next Jonas Brother'
  ,', though your mother probably wouldn\'t approve'
  ,' after your dad mentions you\'re probably adopted'
  ,', which you discover after \"the incident\"'
  ,', which is mostly a placebo but you enjoy it anyways'
  ,', especially when you don\'t really want to'
  ,' because hell, why not?'
  ,' before you go to bed'
  ,' while whispering sweet nothings'
  ,', but only with the Kardashian\'s permission'
  ,' in case you are ever stuck on Gilligan\'s Island'
  ,', but only if you take on the identity of a Jersey Shore actor'
  ,' whenever you take a leak'
  ,' whenever you eat pizza'
  ,' whenever your mother calls'
  ,' whenever you cheat... at anything'
  ,' whenever you lie'
  ,', as long as you remember your grandpa\'s birthday'
  ,', as long as you can see your waistline'
  ,', as long as you haven\'t masturbated for a week'
  ,', as long as you haven\'t eaten beans'
  ,', but only if Kristen Stewart smiles first'
  ,', but only if Kanye West interrupts you first'
]

var nameAdjectives = [
  'Crimson'
  ,'Blueberry'
  ,'Mysterious'
  ,'Angry'
  ,'Therapeutic'
  ,'Chunky'
  ,'Timid'
  ,'Daring'
  ,'Mad'
  ,'Razor-sharp'
  ,'Half'
  ,'Pissant'
  ,'Burnt'
  ,'John Jacob'
  ,'Mildly Racist'
  ,'Mostly Racist'
  ,'Asinine'
  ,'Putrid'
  ,'Moronic'
  ,'Premature'
  ,'Inarticulate'
  ,'Passive'
  ,'Poorly Defined'
  ,'Indignant'
  ,'Underdeveloped'
  ,'Prepubescent'
  ,'Patty-cake'
  ,'Pretty Awesome'
  ,'Ditzy'
  ,'Actually Insane'
  ,'Everdrunk'
  ,'Swooping'
  ,'Pokey'
  ,'Inappropriate'
  ,'Dangerous'
  ,'Slightly Inconvenient'
  ,'Pareto Efficient'
  ,'Incompetent'
  ,'PATRIOTIC'
  ,'Pantless'
  ,'Baby-faced'
]

var nameNouns = [
  'Hatter'
  ,'Laser'
  ,'Daredevil'
  ,'Vision'
  ,'Avenger'
  ,'Man Girl'
  ,'Wolf-Man'
  ,'Tiger-Boy'
  ,'Duck'
  ,'Demon'
  ,'Jesus'
  ,'Porcupine'
  ,'Italian'
  ,'Indian'
  ,'Brown-noser'
  ,'Bigot'
  ,'Seal'
  ,'Ant'
  ,'Potter'
  ,'Nipple'
  ,'Ingrown Hair'
  ,'Fiddlesticks'
  ,'Jingleheimerschmidt'
  ,'Kraken'
  ,'Farmhand'
  ,'Justice'
  ,'Arachnid'
  ,'Puppy'
  ,'Neo-Nazi'
  ,'Potato'
  ,'Miscreant'
  ,'Pooh-bear'
  ,'Feminist'
  ,'Masochist'
  ,'Pariah'
  ,'Beatle-Man'
  ,'Ant-Man'
  ,'Bizarro'
]

/**
 * Returns a hero name, power, and enemy
 */
function hero(done) {
  var hero = {
    name: null,
    power: null,
    enemy: null
  }
  hero.name = 'The ' + nameAdjectives[Math.floor(Math.random()*nameAdjectives.length)] + ' ' + nameNouns[Math.floor(Math.random()*nameNouns.length)];
  hero.power = '' + verbs[Math.floor(Math.random()*verbs.length)] + ' ' + nouns[Math.floor(Math.random()*nouns.length)] + modifiers[Math.floor(Math.random()*modifiers.length)];

  User.find({}, '-salt -hashedPassword', function(err, users){
    var enemy;
    if(users.length > 0){
      var backup = users[0]._id;
      enemy = users[Math.floor(Math.random()*users.length)]
      if(!enemy.facebook){
        enemy.facebook = {
          id: null
        }
      }
      if(enemy.facebook.id){
        hero.enemy = enemy._id
      } else {
        hero.enemy = backup
      }
    } else {
      hero.enemy = backup
    }
    return done(hero)
  })
}

exports.hero = hero;
