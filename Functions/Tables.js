module.exports = async (client) => {

    /* USTAWIENIA */
    client.db.prepare("CREATE TABLE IF NOT EXISTS settings (guildID, prefix)").run()
    client.db.prepare("CREATE TABLE IF NOT EXISTS autoMod (guildID)").run()
    /* USTAWIENIA */

    /* REKLAMOWE */
    client.db.prepare("CREATE TABLE IF NOT EXISTS adSettings (guildID, channelID, ad, invite)").run()
    client.db.prepare("CREATE TABLE IF NOT EXISTS adVerification (guildID, userID)").run()
    client.db.prepare("CREATE TABLE IF NOT EXISTS adVerificated (guildID, userID)").run()
    client.db.prepare("CREATE TABLE IF NOT EXISTS adNumber (guildID, number)").run()
    client.db.prepare("CREATE TABLE IF NOT EXISTS adSended (guildID, number)").run()
    /* REKLAMOWE */

    /* INNE */
    client.db.prepare("CREATE TABLE IF NOT EXISTS premium (guildID, developerID)").run()
    client.db.prepare("CREATE TABLE IF NOT EXISTS gBan (userID, date, developerID, reason)").run()
    /* INNE */

}