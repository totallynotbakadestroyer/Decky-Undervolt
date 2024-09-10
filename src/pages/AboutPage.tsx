  const AboutPage = () => {
    return (
            <div style={{fontSize: '12px'}}>
            <p>Decky-Undervolt could not be made without this awesome tools:</p>
            <ul>
                <li><b>Ryzenadj</b>: Power Management tool for Ryzen APUs made by FlyGoat (LGPL-3.0 license)</li>
                <li><b>Steam-Deck-Software-Undervolt Pososaku's fork</b>: Easy way to implement per-core undervolt, made by Pososaku (GPL-3.0 License)</li>
            </ul>
            <p>But most importantly, Decky-Undervolt could not be made without the support of these amazing people:</p>
            <ul>
                <li><b>Pososaku (Ew Meh)</b>: For making Steam Deck overclocking popular in Russian community and his awesome fork</li>
                <li><b>deadwenk (Alexey Tarasov)</b>: For contributing Steam-Deck-Software-Undervolt and making it easier to use per-core undervolting</li>
                <li><b>FoxN</b>: For finding a solution to make software undervolting possible at Steam Deck OLED</li>
                <li><b>Robert (biddbb)</b>: For maintaining overclocking guide</li>
                <li><b>NGnius</b>: For resolving licensing issues</li>
                <li><b>NotBullseye</b>: For creating plugin logo</li>
                <li><b>Everyone in the Steam Deck OC Telegram community</b>: For their support and feedback</li>
            </ul>
            <div style={{textAlign: 'center'}}>
            <p>And of course, thank you for using Decky-Undervolt!</p>
            <div>Made with ❤️ by BakaDestroyer </div>
            </div> 
            </div>
    );
  };
  
  export default AboutPage;
