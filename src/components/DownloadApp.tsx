import Image from "next/image";
import Link from "next/link";

export default function DownloadApp() {
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <h3 className="text-sm">Descarga la app.</h3>
      <div className="flex gap-2 font-sans mt-3">
      <Link href={'https://play.google.com/store/apps/details?id=com.instagram.android&hl=es'} className="bg-black border rounded px-2 py-1 flex items-center gap-1">
            <Image src={'/LogosGooglePlayIcon.svg'} width={30} height={30} alt="logo-google-play"/>
            <div className="flex flex-col justify-center ">
                <span className="text-[9px] text-white font-semibold">DISPONIBLE EN</span>
                <h4 className="font-semibold text-white">Google Play</h4>
            </div>
        </Link> 
        <Link href={'https://apps.microsoft.com/home?hl=es-es&gl=ES'} className="bg-black border rounded px-2 flex items-center gap-1">
            <Image src={'/LogosMicrosoftIcon.svg'} width={30} height={30} alt="logo-google-play"/>
            <div className="flex flex-col justify-center ">
                <span className="text-[9px] text-white font-semibold">Consiguelo de</span>
                <h4 className="font-semibold text-white">Microsoft</h4>
            </div>
        </Link> 
      </div>
    </div>
  );
}
