import { useTranslation } from 'react-i18next';
import './i18n.tsx';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <div style={{ fontSize: '12px' }}>
            <p>{t('title')}</p>
            <ul>
                <li><b>Ryzenadj</b>: {t('ryzenadj')}</li>
                <li><b>Steam-Deck-Software-Undervolt Pososaku's fork</b>: {t('steamDeckUndervolt')}</li>
            </ul>
            <p>{t('supportTitle')}</p>
            <ul>
                <li><b>Pososaku (Ew Meh)</b>: {t('pososaku')}</li>
                <li><b>deadwenk (Alexey Tarasov)</b>: {t('deadwenk')}</li>
                <li><b>FoxN</b>: {t('foxN')}</li>
                <li><b>Robert (biddbb)</b>: {t('robert')}</li>
                <li><b>NGnius</b>: {t('ngnius')}</li>
                <li><b>NotBullseye</b>: {t('notBullseye')}</li>
                <li><b>Everyone in the UltraNX Steam Deck community</b>: {t('ultraNX')}</li>
            </ul>
            <div style={{ textAlign: 'center' }}>
                <p>{t('thankYou')}</p>
                <div>{t('madeWithLove')}</div>
            </div>
        </div>
    );
};

export default AboutPage;