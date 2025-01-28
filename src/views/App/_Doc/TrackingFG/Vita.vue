<template>
  <AppLayout ref="AppLayoutComponent">
    <template #view>
      <div class="grid grid-cols-1">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
              <div
                v-if="base.pagination.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.pagination.loading ? 'blur-sm' : ''}`">
                <div ref="titleZone">
                  <div
                    class="gap-2 sm:gap-4 flex-row flex w-full justify-start items-center relative overflow-x-auto py-1"
                  >
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'Tracking_FG_Vita_Manual_V_Eng'" 
                      :disabled="file == 'Tracking_FG_Vita_Manual_V_Eng'"
                    >
                      Tracking FG Vita Manual V.Eng
                    </button>
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'คู่มือการใช้งาน_Tracking_FG_Vita_V_2'" 
                      :disabled="file == 'คู่มือการใช้งาน_Tracking_FG_Vita_V_2'"
                    >
                      คู่มือการใช้งาน Tracking FG Vita V.2 (ปัจจุบัน)
                    </button>
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'คู่มือการใช้งาน_Tracking_FG_Vita_V_1'" 
                      :disabled="file == 'คู่มือการใช้งาน_Tracking_FG_Vita_V_1'"
                    >
                      คู่มือการใช้งาน Tracking FG Vita V.1 (เก่า)
                    </button>
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'Form_Minute_Meeting_04062024'" 
                      :disabled="file == 'Form_Minute_Meeting_04062024'"
                      >
                      Minute Of Meeting 04/06/2024
                    </button>
                    |
                    <button 
                      class="btn btn-xs bg-orange-200 border-orange-200 disabled:bg-orange-600 disabled:border-orange-600 disabled:text-white" 
                      @click="file = 'tracking_diagram_simple'" 
                      :disabled="file == 'tracking_diagram_simple'"
                    >
                      <Icon icon="icon-park-twotone:tree-diagram" />
                      Diagram Simple
                    </button>
                    <button 
                      class="btn btn-xs bg-orange-200 border-orange-200 disabled:bg-orange-600 disabled:border-orange-600 disabled:text-white" 
                      @click="file = 'tracking_diagram'" 
                      :disabled="file == 'tracking_diagram'"
                    >
                      <Icon icon="icon-park-twotone:tree-diagram" />
                      Diagram Full
                    </button>
                  </div>
                  <div class="divider my-1"></div>
                </div>
                <div
                  class="overflow-x-auto w-full my-2"
                  :style="{
                    maxHeight: contentHeight,
                    minHeight: contentHeight,
                  }"
                >
                  <div style="height: 74vh;" v-if="file">
                    <iframe v-if="file == 'tracking_diagram_simple'" frameborder="0" style="width:100%;height:100%;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=tracking_diagram_simple.drawio#R%3Cmxfile%3E%3Cdiagram%20name%3D%22Page-1%22%20id%3D%22e7e014a7-5840-1c2e-5031-d8a46d1fe8dd%22%3E7Vpbc9o6EP41PDbji3x7xEDSziQznNJb%2BpLRsVXbjbEYWQTor6%2BMJV%2BQAbcBbE7OE9Zqrcvufqv9LAb6aL6%2BI3ARPmAfxQNN8dcDfTzQNBXogP1kkk0usWwlFwQk8rlSKZhFvxAXCrVl5KO0pkgxjmm0qAs9nCTIozUZJASv6mo%2FcFyfdQEDJAlmHoxl6dfIp2EuBaZd6XiPoiDkU%2Bu6wlf%2BL%2FSeA4KXCZ8wwQnKe%2BZQjMNV0xD6eFUR6ZOBPiIY0%2Fxpvh6hOLOrMFn%2B3u2e3mJpBCW0zQta%2FsILjJd825%2FdDzO%2BNroRtkhX0TyGbBe6uwojimYL6GVdK%2BZ6eUq%2BihdEKFpXRHwJdwjPESUbpsJ7gTAHDxVVhMqqNLwmZGHF5qbYAOTODoqxi%2Bk%2BsuCAScC2Usxn16drmM1pmExX6nPBmCKSQIrczNVp1c7sobLPUrS1frMnLE95mrvw8dfT%2Feb%2BqzJ2%2F5mO3wFLcgXyWZTyJiY0xAFOYDwppe428lA2rMJapc49xgsmVJnwJ6J0wyEHlxQzUUjnMe9ljiSbb9n7N4ZoPvLhto3xutba8JYcCdw7KV4SDx3aJ1ekkASIHlLUc8XMCgcji6AY0uiljuWmKKm57I%2F9I%2BNnxvZAJa%2BVPlEbMVSz%2Fw%2BcUO4cle3NDWKYptzGKSX4uUhImXaRQg66oD0Yd8BhahI4VK0BHUA5l43tN4IBvS0GQL8woEsYGEyUgWsPhkPxoG8fnIHtcIkrdGyrrlPpGhY6qtSlH0CYchxhp4eJCuRDpBEn5rlwYiiSTf6bOAFtcWL0CyegGScMFQoPa8eQwGDsgmEowGDbQkdIHFAHnlPq2HIh0TFgtO4Bo74RwBhtAWP2CzDGvoPFmYjQB7uo4F0s9NmkingWcHIKYBT6rhiKhZkyhXGMDlVvnUBF7xwqIjIqrhijmEXAdtW3d32zGLikxeT658uHT0PJJGfm0NZuQXJmDl2YeD%2BJtvpBoo0rJxCi1j2W542T1zv81SmO2FoKz7NS98aoxxrQhEQMkx82%2FM0z%2BFQ%2BG%2FpGvEVa%2BIMctmPWzqm3deWUojVynJYVkun0qkIS6z5AvYsKyRHU2wZ7yHiFiNhag46mzCj2nk991r8eJ91TCfONHDGm2RIoRr%2BAYsr168yDiWAIVcKtllShd4He%2FUcmU844k8S%2F7lO3ZuLWXOsUh678RagL5qAWF5cXu347Sh1Usx%2FcwZI%2FNF9VYgctE7slbtiPJXZL61ViF%2BvuMQ8QIP%2FrC7gLJqRmGztvBANaWwz062JBrLuCgWnkPUdJcOoK5rWh3H39Yl85o20dy22%2F%2BVv9%2BuZvyd91prCXsdw96bQu%2FFH%2BtRa76DXG4%2Fzn0%2FuJ%2F%2FEh%2Ffayvn%2BIvt8ulXdAMsllwa8ooAb%2FG920jqSAbWuKSMQsgAgX%2BjANi1qmXpCARteJm86jV4Vt%2Bb3ZWdpodKwlIWG0TCkbnDDpKIwSKHn%2B3KTKNP8nVXu8pcq8l20IZVFyjrx1MGL%2BNpk1mfeiuUw1uk1m9URmHEljZ8tYVkPGOhh0Z89YrFn%2BfzuHTPkHeX3yGw%3D%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E"></iframe>
                    <iframe v-else-if="file == 'tracking_diagram'" frameborder="0" style="width:100%; height:100%;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=tracking_diagram.drawio#R%3Cmxfile%3E%3Cdiagram%20id%3D%22C5RBs43oDa-KdzZeNtuy%22%20name%3D%22Page-1%22%3E7V1bd6O2Fv41Xuuch8zifnm0c5lbkkmTmU5nXrqIITYdG1yMk7i%2FvsJGGKTNxbYEIm4fOg4GDNLen7591UA9n7%2B%2Bj5zF9CZ0vdlAkdzXgXoxUBRVt3T0T3JkvT0i27q0PTKJfDc9tjvw4P%2FjpQfxaSvf9ZaFE%2BMwnMX%2BonhwHAaBN44Lx5woCl%2BKpz2Fs%2BKvLpyJRx14GDsz%2Buh3342n6YupkrT74oPnT6bpT2uGlV4yd%2FDZ6anLqeOGL7lD6uVAPY%2FCMN5%2Bmr%2Bee7Nk%2BPDAfP%2B4%2Fj67%2FmW8%2F%2FTb8m%2Fn2%2Bjz19vfz7Y3u9rnkuwdIi%2BID7711dheqT%2FuPs4vLm9vA%2BmvWzdQznQ7fbd4jUfMc9EApn%2BGUTwNJ2HgzC53R0dRuApcL7mthP7anXMdhgt0UEYH%2F%2FLieJ1Kg7OKQ3RoGs9n6bfoNaL1H%2Bn1mz9%2BJH%2B80%2FGfF6%2F5Ly%2FW6V8NxyEdr2W4isZexXlqKo9ONPHiikFStuclA5MTqnSU33vh3EMPiU6IvJkT%2B89FyXNSAZ5k5%2B3mCH1Ip2kPaUif%2BtmZrdJfekBvEFPzuJulZMhfpn7sPSyczYC8IGUvzshTGMTpdMno1UaTmbNcpqO%2BjKPwV6Y9ydmZJuw%2FKc9eFHuvlcOYfqulaoeRx0z%2FftmpsYxVc5rXYOn4gQfFwOxEVV79%2BI%2Fc55yioL92epL8gdWkffUCx0tqqF5GV%2BpV9dQ59Rooxgw9%2F8j1n9HHSfLx8hYfRL%2BROw6ceu89NT73Y%2FAc%2BmhMm55%2FHTquH0zQ4144cfPL7r25E%2F1alp1PCDlS9kXyEcmFM5t5s3ASOXN04sKLfDTkXkR%2Bd7f7ohZ2%2FFcPkwaZJ5ZYBJjoAJgYAJhYvMBE79O6ewgIMQYTpSGYSKzBJL30LvTRe2QCpZqEQJGCsn2h9CpCVrLHOEJ8dAqmziNvAwKAWF07j4jXF0TBmfmTAH0eo%2BnZaGqiTD7izcP0i7nvulup85b%2BP87j5n7JxC6Sd9q8pT4a6BfgVFeJPKW1GflPf6RAryFtPpPeSaqd8qBDJxKfEj49LT0uc6TQK8mlNBhZg%2BEQf1A3H%2ByBZadHRvgcyyyek%2FtqmJ0jU1%2BpFTRQqsdjXvhLkTmjIZkzeOGvDK3z%2FaB3jJHVaIisNhdkHUaRs86dkKJLKfBaNiFJNmH17nc%2B%2BrB9ArbobFDCdeu9CAzNmTawxeZ14U7iIjU9XRiXpRRY7UsMtRr%2BysKYi95EuotCdzWuMsI7RF9TEQ19VU0M9A3cYeJjTJQtcXj44%2B3BK3%2F2Biiz1RDYFZ0LslNQTBlhEilf20elSPO%2Ba4Rs6PstEnUXcFolaCU4D4MnP5oLvFJkmnv0SoG0wTZllgsFXoI0Bbor%2F2XEoubzOkye6zZ8B3hhfls5QezH68ZuG%2FSvM0%2BWjOBxmfxz4wSrJ2ccr6J6H9Ab9OnIqtFgWYOcOiyWtRv52QjvVo7041of%2Fb68jK8%2B3GHnQz%2BcOoxXG7vhaiPLrFebo5iIDRARSvMepmESYJHOQ7e5l%2FXCW44jfxH7YXBCWmk3Ucp2LX1BuGZ%2FAzlYZWt122qHSKoEkTR58UhqhanjkTUX8OGReHqOMF%2B3PAW7FTNv4sXOGSm4iSvLXeLOyrryH9Xv8%2B%2FS57s%2Fp6bsLryfGe50AzM7aPmR%2B6YOZnbI8qMALK3ADLZD8zADj6zKBWfK4aFc4TUiDqRLhDiVxIHoO%2BnEnRSzGagdgCLwoJY4wWjw2GBG4SsEJ%2BegsLdus1ZqIhPvpgoal8earIQdrBZvwMRkBS0WOl7UqsVSxBu5e7yBfR5iZagodOwXa6FMRhht7eh4Iu2HIH%2FDIC%2Bzs3CmlNAKxfh7FWZX5mmJTj2UTj5UhjUZYxnJ5Mulj5JjNQljyX61qcX2v4UXJPk0%2Fz8he002moRmeXlRYHUD%2BGwnKJUFB4Iw8AqRgf3RiLtNJOmFaTQt7Z2tHMZFVMmovRc7NgKuSx3NuBA8WG0akWe%2BLB1kJZuENW6wNXlB8aC9dj%2B8pRgMtEqcmRBQ0zZFSn0C39foVn079ZZB6gsOUmeOcPhp6ISo21BglcLmKguVkjXJFEilKsXqcC%2FfFWklpB%2By9EP0ITMXlCqP3zScP66WHXr7DGLNUWjOagGUlVs2t1bigm3uPJHwZ2wJ2UNyuuxR3qq6S8wKem6wTeKG49V8M%2Bx1k%2FS4xd3rR%2B5JoDrho1VV6Z2qUjMHumm5TZ3R0VqVGRchEpqCcbGpsEpKugjzY3PsYAOkdt3SWoreaITBaSo2R%2Bui8lVz6voFGe3ONlYrPYydYJCFQ3a%2BCXmnmhQkihAEIbOsDXs3sp2FXw2ZGiwB9EuA9Dzs3%2Betb6SDZw99o%2B6l20VHtaFL7xRVNy1bM1XD0oiHK3E47Gthkm9g6NkbcA2sGt14IfqbKIDT%2BfKmz3C9vhpF88%2BfXsLwm3Nvn4%2BCP9lXVJcE1WSjKK%2BWfIi80veViHxRU2%2BsU8cKv2mTwr%2BPxvNNaMVujirHLZRynZP%2Bovq0I9e1jrbGUJ1bZXVgkcXHWmBQTUVZM0hsReawJWX%2F8RFq8g3aQnSdbp7wRiS0qTOp%2FxKaYHj7EkrDLifO0U1EHswakhpyjk6jJVg6alWEk327f3GKVJQszaxd0NXaS4rCSP%2BoaXRudBt0Hq4oDuZKTWTiYbYkIm8IyzfbxCGDuAHHWpdubKP%2BVuM1xilTEwSn7Dor4pBraoCKyqfUDndWJCSheDOzMQthlVWpmRToCROprtRrNnE1Qz8yrob9Tm3BGtZSoGkH5AbOgmWXVMJ8%2BkEjL4ecx53H08jIjGGBnuNWY2omPRW%2F3Q9wERYxhG8hFY%2BsjzYUAdz32LDMzcLIicanMgem0e4cgN7SE%2BnRCcufQtMmcJBail7KqlIOlazrz5QDKFj9NXwcF3iiCn1Jw%2FEvdOhLEk394ATum4QMWSYlouWwK5zO1U23UkFAQ6NBAx4lsSo7TNpF0qfKjkqSnN00S4TK7mVl6WpEG7z8e%2BvkOcODSjwib%2ByheXRPqsaD9P6VIRSvMg9wwRaq9KzOaX1IWe3hoFYVM68lQnzcRwDRkIu%2BR5MfESLl11JreVD9JUfTIHD06do8UZzcVUrIxNujqCrTvn%2Bwi9suXs%2FEFQQOTTd5ob1I%2FmmKT6BLFNNg3gBlk7ScRY4OayET2D1cpRRH4AXj%2BFex6vGMuAE%2FdKCtXZJzZxQ4Jei56ophVnhhkV%2FZFBeu4tR7Mn6Sw%2Bc4NSlynfukyaalLbukq6hVbtKHM2%2FTGWwUvsId%2B8rso6MnjLTQbPI%2BpXKTl7asJP84O%2BsNGk1kiZGltWszwf6KXm0bwZhgNO1nazAnGEeBBl1r0i%2Bfzu531CJG0EscUwfQwc6dU%2BvgQUUkWvbu3Aw%2FfFV%2Bnt06y8%2Fu%2Facv4Z8XPyWAH1XsT8IZvxjjENQOET6x7QYNrEku0Fnwzt%2BEdLJexNv%2FD5J61OQLkkWKWBYny7jWvbPegHpHRXFCrOMy0CAhit5%2FDsz5%2BjEwzJ%2BG%2Fv55Nv%2FEfi%2Bno9ZxqEEe0Co42XlUkb5ELlojCq2%2Fa5ev89UyRs8aNb7gYduuanByrb%2BpnQRAjea13sEarZyGRlcpaq3rT%2B1Mo6sem1jdthqVKrCI65kpd7mewf2NTkT6QarbtG2tLkhit0xuiSUpNW2tqStkjXGTr4pxzasnbkgD7IQaN1426zbeeIMLpixJRBTN7hwyummP3XrRGijaJg0Z4HlyZwtm1WP3z5W1wOv6CTqyZQHZMr5xP%2FhCu9VjlUBQjxiCkAyqrbCq1ZCMuiuOJhmwJNIuLlESdio1h8X%2Ba4pu2MUh3%2F51dMKOAt2Vf9dRpePoWFvd7BsjhFheNXjOaK%2BaMBkwlULGppevqZoFXeFTFs4lLaZSCumIQbnthg8tF5u2e7tZx2Tt0Rn%2Fmmz09GwczkI0z8PkOQI%2F9jet3Qq0rsAU6byLjI1eDHY9Nxs2RC1uv5ijkNsnL75NDbPsPL9G1kk3kgLZhBJAC2VykxtmBsapVK1UUrdaRxLuS8c9xdsiLQdMyXhsA1A1JD20OJ0TtjipDcfVNi1OOB%2Bh43KT3lmcSlOLU%2BGDRvtanArZ7aPW4qy9go9bW6EpUk8wzfVmaPqik8Q0hWzbJQKmKZQkXQJF1jsUkxuMZxjEeDjRcIwmSQvEFGGWcRT%2B8r6nr7tpUz513E2nxP0BaI%2BhtyjPENDvH4xekHSFnQOzT6vJ4SsDHMVvSFN11uvCUTMGdP5MYTPbV47Ktx%2BauyPbDDdn4mG7Mdu%2BLr%2FNxsWgdmeGPqOgbJFbOGjwFg5QWQa3aIJ1wsrYNPnAFEoZS3awzNObTMmytHE0zfmNqumildxVTZUaZke5bVjIrSXz%2B7HQ6q%2FniRPGgdPhSGQnlDJ0aDXWSAetH5xnOg9diNQuhdxAvmwEW81W7qT%2FFGOcBDIuKndyEiQ80nGSTKdLm9yUaDLfDv4obZFLmWbbe4EJAWmy0TGkwYWUvXIHMlYsyLVX2dNNEDCUe4WGh%2FTUb2Gi4RPFyBqyiXiTXtPnnlUSEOCS9YPltrIfgeYc%2FYNIN1RxGq8XG4fAJiLtuCfVVoxqsNJy30N4KmmfaHn9cWYJWvnV92G12NRuDd25H7SYr5DfyTU7YpLmq32OXyPLUcgs2wvy5JFFEo0RYb1uhuO4TAYhWIZK%2BIj1knYN7Qpjr9o1tBt0rFyH6heszpgJ%2FDgCZ7FVSiabNv%2ByxrTxG9M0Nfj1O84zaqv4pLGSCUb%2F4ee2KSUTOlUbCxmjrTQMtpmiLSgZnbx17%2F298pZgEijhQU%2B2yciTbuHTKWWSgKit9iuDHWOd9rDcp1euIJ4RtanBrDJ3Ex9mMKtFoZMxly3fuZYoBCWvGFTvz0TGf2VKeNllhMIbKtH2ndCLAFZBJouALevGcaifThuXDZXg9%2B9VRrcAPjsIgqrK40VDoNpmAhJZd0BcwcfFh%2BN6vbHQVJbsMaEnxUE%2FDkbgMiMulX6VSpKbzRsnWDkz8YihRfXOwImkLbBCuIKto9hXtq12%2BLxxg6IjV%2F6MU7yfE0HbozcK892gqF%2BqJXvc%2B7ZUDn0%2B42a8cZXvF9e%2BLNbw2ZS%2FO2kSKnbsm2bbKq387fqksVOnX4SsQ5%2B01jjFknll9UE4oZChkPpCmLorOFGykizQ3hTCnGp93y6Bs5NaGFiYyrtzTuUBFKWdI332g7M4QbDE2SgtXsHY7LfRx4fc5CZ3K5lbNHxxcUagCQvRQD%2FNNkRoiqwGL6DwlRsVLc6aRs8ZNGXcamh0oBCOzZT9%2FvHr8G1MmU1OGZg71%2B60%2FRfU3rNEA9qNsqK9Wtetm%2Bh%2BYXWtm%2BquOL6QFrJjMZUWI4hb1%2B5HANciJIgtBX4Pk0SSl9p1vkXZqryAD4%2FV6TjnIdmDSY%2FCU0oflEk%2BIkBffkOovJAeQApuRVPfs4Z5hvFxPtBehaW6mjRNrBJu%2FNylub25UszD%2FQRCOhLtRhZ3qyU02M0rQnJJNea1HHpgD3V70iPmkQeyLqOWh6lSBzzMoHnYauFudkbZh4eNnShanxQRo8Alo9HddYfvuKdDW61cKwMJ9REHsYqVcYLuSZIqaNIq%2B38JQqrwcwPlylk8xKBIVcaccv1UL4keGNSOtPA2jyLyrcTRKhzfosfqP77FBwVLwqQ4UY0331K0kh8q5Vs1BI0P38LjfiTf8pfLlXdKfIsGl%2B751om00ILbCgALN3ReZy20qp66f8kTVIcumXzMUm%2FO0fvU01C0nPqLxTaRg3VRdx7TDqirfgtQR3UQh9LfuPVMrVDit94ylezEBuR6cGuYCsNVN%2BxVkBUGWGLg7mOWWGsMkMmL3qEq27af%2BkI4Uk2pefMIfhpDZ7S9SaiSJBEH36LpFcvcNOnrF%2FS%2F828PX7%2FcXN6%2FjVw10gY16DUnm7BWJhFLzGmuOTa95sD72ovlRMbPfWprjpwBHAfQQ39GYQJDO%2F8PGqLpTegmlY6X%2FwI%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E"></iframe>
                    <PDFViewer
                      v-else
                      :source="`${serviceUrl}/api/controllers/MYSQL/INTERNAL/Global/doc?file=${file}.pdf&path=TrackingFG`"
                      :loading-text="'กำลังโหลด'"
                      :rendering-text="'กำลังโหลด'"
                      style="height: 100%; width: 100%"
                      @download="download"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";
import PDFViewer from "pdf-viewer-vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesSystemBranchModalBranch from "@/components/App/Module/Pages/System/Branch/Modal/Branch";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

export default {
  name: "Doc",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesSystemBranchModalBranch,
    AppModuleGlobalRemove,
    PDFViewer,
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone, 0);

    const file = ref('')

    const base = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
      },
    });

    const download = (source, filename) => {
      const link = document.createElement('a');
      link.href = `${serviceUrl.value}/upload/_Doc/TrackingFG/${file.value}.pdf`;
      link.target = '_blank';
      link.download = `${file.value}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // const exportExcel = () => {
    //   return window.open(
    //     `${serviceUrl.value}upload/_Doc/DocumentAlert/ฟอร์มเก็บสัญญา_Rev5.xlsx`
    //   );
    // };

    return {
      base,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      user,
      serviceUrl,
      PDFViewer,
      download,
      // exportExcel,
      file,
    };
  },
};
</script>
