import Link from "next/link"
import Image from "next/image";
import DropdownIcon from "./DropdownIcon";
import logoImg from '../../public/ontario-logo--desktop.svg'
import SignBtn from "./SignBtn";


export default function Header() {
  const session = false;

  return (
    <>
      <div className="documentation-only--application">
        <div className="ontario-header__container">
          <header className="ontario-application-header ontario-header" id="ontario-header">
            <div className="ontario-row">
              <div className="ontario-columns ontario-small-6 ontario-application-header__logo">
                <a href="https://www.ontario.ca/page/government-ontario">
                  <Image src={logoImg} alt="logo"/>
                </a>
              </div>
              <div className="ontario-columns 
                ontario-small-6 
                ontario-application-header__lang-toggle">
                <SignBtn/>

              </div>
            </div>
          </header>

          <div className="ontario-application-subheader-menu__container">
            <section className="ontario-application-subheader">
              <div className="ontario-row">
                <div className="ontario-columns ontario-small-12 ontario-application-subheader__container">
                  <p className="ontario-application-subheader__heading">
                    <Link href="/">Kudos</Link>
                  </p>

                  <div className="ontario-application-subheader__menu-container">
                    <ul className="ontario-application-subheader__menu ontario-show-for-large">
                      <li><Link href="/homePage">Home</Link></li>
                      <li><Link href="/giveKudos">Give Kudos</Link></li>
                      <li><Link href="/myKudos">My Kudos</Link></li>
                      <li><Link href="/about">About</Link></li>
                    </ul>

                    <DropdownIcon/>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  )
}