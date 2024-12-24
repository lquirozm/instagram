import Link from "next/link";

export default function Footer(){
    return(
        <footer className="flex flex-wrap justify-center gap-4 text-[12px] font-sans text-[rgb(115,115,115)] my-10">
            <Link href={'https://about.meta.com/'}>Meta</Link>
            <Link href={'https://about.instagram.com/'}>Informacion</Link>
            <Link href={'https://about.instagram.com/blog/'}>Blog</Link>
            <Link href={'https://about.instagram.com/about-us/careers'}>Empleo</Link>
            <Link href={'https://help.instagram.com/'}>Ayuda</Link>
            <Link href={'https://developers.facebook.com/docs/instagram'}>API</Link>
            <Link href={'https://www.instagram.com/legal/privacy/'}>Privacidad</Link>
            <Link href={'https://www.instagram.com/legal/terms/'}>Condiciones</Link>
            <Link href={'https://www.instagram.com/explore/locations/'}>Ubicaciones</Link>
            <Link href={'https://www.instagram.com/web/lite/'} >Instagram Lite</Link>
            <Link href={'https://www.threads.net/'}>Threads</Link>
            <Link href={'https://www.facebook.com/help/instagram/261704639352628'}>Importacion de contactos y no usuarios</Link>
            <Link href={'https://www.instagram.com/accounts/meta_verified/?entrypoint=web_footer'}>Meta Veirifed</Link>
            <span>&copy; 2024 Instagram from Meta</span>
        </footer>
    )
}