exports.run = async (client, message, args) => {

    const info = [
        `**Informacje co daje premium:**  `,
        `:one: Wyjątkowe funkcje bota.`,
        `:two: Reklamę w embedzie.`,
        `\nP.S. Premium możesz zakupić w supporcie!`
    ].join("\n")

    return {

        embed: {

            type: "success",
            title: "Premium",
            emoji: ":trophy:",
            desc: info

        }

    }

}

exports.info = {

    name: "premium",
    aliases: ["premiuminfo", "prem", "premiumInfo"],
    description: "Informacje odnośnie premium.",
    category: "Podstawowe"

}