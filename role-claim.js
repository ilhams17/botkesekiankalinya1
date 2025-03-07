const firstMessage = require('./first-message')

module.exports = (client) => {
  const channelId = '800327525183258656'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    TCHLogo: 'TCH Team',
    newmember: 'New Member'
  }

  const reactions = []

  let emojiText = 'Klik sticker kiri dibawah untuk mendapatkan role "TCH Team" dan klik sticker kanan untuk mendapatkan role "New Member" atau jika tidak bisa dapat meminta role ke <@459638057080193034>\n\nNote : Silahkan ke channel <#799593093543755787> untuk melihat informasi room\n\n'
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += `${emoji} = ${role}\n`
  }

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '794077887556222996') {
      return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}