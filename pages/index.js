import Head from 'next/head'
import Image from 'next/image'
import homeStyles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={homeStyles.container}>
      <navbar className={homeStyles.navbar}>
        <div className={homeStyles.navbar_left}>
          <p className={homeStyles.logo}>Fusion<span>H</span><span>R</span></p>
        </div>
        <div className={homeStyles.navbar_right}>
          <a href=''>How To</a>
          <button className={homeStyles.login_btn}><Link href='/login'>Login</Link></button>
        </div>
      </navbar>
      <div className={homeStyles.hero_container}>
        <div className={homeStyles.hero_left}>
          <h1 className={homeStyles.hero_header}><span style={{color:"#E5625E"}}>Refer</span> and earn upto <span style={{color:"#FF6B35"}}>$5,000</span> in commissions per hire</h1>
          <button className={homeStyles.refer_btn}>
            <Link href="/login">refer now</Link>
            <span>&rarr;</span>
          </button>
        </div>
        <div className={homeStyles.hero_right}>
          <img src='/hero.svg' alt='' className={homeStyles.hero_img}/>
        </div>
      </div>
    </div>
  )
}
