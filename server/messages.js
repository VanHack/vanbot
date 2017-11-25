/**
 * Message for new members on #general channel
 */
export const getTeamJoinMessage = (user, introductionsChannelId) => {
  const messages = [
    `Woo hoo! Hello and Welcome to VanHack Premium <@${user.id}>! Are you ready to super charge your journey of getting an amazing tech job in Canada? We're here to help you with each step along the way. But first thing first, please introduce yourself in the <#${introductionsChannelId}> channel and let's get VanHacking!`,
    `Booyah! A big warm welcome to VanHack Premium <@${user.id}>! Step 1: introduce yourself in the <#${introductionsChannelId}> channel and let's start VanHacking :D`,
    `It's raining VanHackers! Welcome to VanHacker Premium <@${user.id}>! Time to launch your career in Canada's growing tech market. Please head over to the <#${introductionsChannelId}> channel and let us know who you are and what you'd like to do in Canada! Ohhh yeah :)`
  ]

  const randomMessage = messages[parseInt(Math.random() * messages.length)];
  return randomMessage;
}
