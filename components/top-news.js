import { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import axios from "axios";

import { API_URL } from "../constant";

const TopNews = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [activePost, setActivePost] = useState("");

  useEffect(() => {
    const data = {
      status: "ok",
      totalResults: 35,
      articles: [
        {
          source: { id: null, name: "NBCSports.com" },
          author: "Nicholas Mendola",
          title:
            "Coventry City vs Luton Town live! Watch playoff final, score, updates - Premier League News, Video, Scores | NBC Sports' ProSoccerTalk",
          description:
            "Luton Town overcame a blown lead in regulation to earn a place in the Premier League by outlasting Coventry City in penalties on Saturday at Wembley Stadium",
          url: "https://soccer.nbcsports.com/2023/05/27/luton-town-promoted-coventry-city-vs-luton-town-final-score-updates/",
          urlToImage:
            "https://soccer.nbcsports.com/wp-content/uploads/sites/14/2023/05/Screenshot-2023-05-27-at-2.58.04-PM.png?w=1024",
          publishedAt: "2023-05-27T18:20:00Z",
          content:
            "The 2022-23 Premier League fixtures are front and center as this season has delivered so much drama all across the league.\r\n[ VIDEO: Premier League highlights ] \r\nRemember: you can watch all 380 Prem… [+34152 chars]",
        },
        {
          source: { id: null, name: "CBS Sports" },
          author: "",
          title:
            "Bucks to hire Adrian Griffin as next head coach, per report - CBS Sports",
          description:
            "Griffin has been an assistant coach in the NBA since 2008",
          url: "https://www.cbssports.com/nba/news/bucks-to-hire-adrian-griffin-as-next-head-coach-per-report/",
          urlToImage:
            "https://sportshub.cbsistatic.com/i/r/2023/05/27/b26b9f29-81f0-4604-9790-7128f01a4cba/thumbnail/1200x675/23c35704ff92e30c13a7c5a3fbf5c0bf/untitled-design-2023-05-27t130015-115.png",
          publishedAt: "2023-05-27T18:05:03Z",
          content:
            "The Milwaukee Bucks have identified their next head coach. After conducting a search that lasted several weeks, the Bucks have decided to hire Toronto Raptors assistant Adrian Griffin, according to E… [+1713 chars]",
        },
        {
          source: { id: "cnn", name: "CNN" },
          author: "Jasmine Wright",
          title:
            "Harris becomes first woman to deliver commencement address at West Point - CNN",
          description:
            "Vice President Kamala Harris on Saturday became the first woman to deliver a commencement address at the  graduation ceremony at the US Military Academy in West Point, New York, warning graduates they were “an increasingly unsettled world where long standing …",
          url: "https://www.cnn.com/2023/05/27/politics/kamala-harris-west-point-commencement/index.html",
          urlToImage:
            "https://media.cnn.com/api/v1/images/stellar/prod/230527122849-01-kamala-harris-west-point-commencement.jpg?c=16x9&q=w_800,c_fill",
          publishedAt: "2023-05-27T17:18:00Z",
          content:
            "Vice President Kamala Harris on Saturday became the first woman to deliver a commencement address at the graduation ceremony at the US Military Academy in West Point, New York, warning graduates they… [+2037 chars]",
        },
        {
          source: { id: "cnn", name: "CNN" },
          author: "Olga Voitovych,Andrew Carey,Nick Paton Walsh",
          title:
            "Ukraine’s commander in chief hints counteroffensive could be imminent in slick video - CNN",
          description:
            "With just a few words and a slickly produced piece of military propaganda, the commander in chief of Ukraine’s armed forces ratcheted up speculation that a long-awaited counteroffensive by Kyiv against Russia’s occupying forces could be imminent.",
          url: "https://www.cnn.com/2023/05/27/europe/ukraine-counteroffensive-speculation-intl/index.html",
          urlToImage:
            "https://media.cnn.com/api/v1/images/stellar/prod/230527094819-ukraine-tank-training-0514-restricted.jpg?c=16x9&q=w_800,c_fill",
          publishedAt: "2023-05-27T16:24:00Z",
          content:
            "With just a few words and a slickly produced piece of military propaganda, the commander in chief of Ukraines armed forces ratcheted up speculation that a long-awaited counteroffensive by Kyiv agains… [+3973 chars]",
        },
        {
          source: { id: "reuters", name: "Reuters" },
          author: null,
          title:
            "Turkey's Erdogan urges voters to turn out, rival sees 'last exit' - Reuters",
          description:
            'Turkish President <a href="/world/middle-east/erdogan-defies-predictions-political-demise-ahead-turkey-election-runoff-2023-05-26/">Tayyip Erdogan</a> sought to build on his momentum going into Sunday\'s runoff <a href="/world/middle-east/turkey-election-runof…',
          url: "https://www.reuters.com/world/middle-east/turkeys-erdogan-urges-voters-turn-out-rival-sees-last-exit-2023-05-27/",
          urlToImage:
            "https://www.reuters.com/resizer/QTjoi06A9n7ss2RRrKURumyRljc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/DMXXDK524RJEPM42GMZKRI73SE.jpg",
          publishedAt: "2023-05-27T16:16:00Z",
          content:
            "ISTANBUL, May 27 (Reuters) - Turkish President Tayyip Erdogan sought to build on his momentum going into Sunday's runoff presidential election, urging Turks to vote as the man aiming to defeat him ca… [+2586 chars]",
        },
        {
          source: { id: null, name: "SciTechDaily" },
          author: null,
          title:
            "AI Battles Superbugs: Helps Find New Antibiotic Drug To Combat Drug-Resistant Infections - SciTechDaily",
          description:
            "The machine-learning algorithm identified a compound that kills Acinetobacter baumannii, a bacterium that lurks in many hospital settings. Using an artificial intelligence algorithm, researchers at MIT and McMaster University have identified a new antibiotic …",
          url: "https://scitechdaily.com/ai-battles-superbugs-helps-find-new-antibiotic-drug-to-combat-drug-resistant-infections/",
          urlToImage:
            "https://scitechdaily.com/images/Antibiotic-Destroying-Bacteria-Concept-Illustration.jpg",
          publishedAt: "2023-05-27T16:03:13Z",
          content:
            "ByAnne Trafton, Massachusetts Institute of TechnologyMay 27, 2023\r\nAI technology has helped MIT and McMaster University researchers identify a new antibiotic named abaucin, effective against Acinetob… [+9942 chars]",
        },
        {
          source: { id: null, name: "CNBC" },
          author: "Reuters",
          title:
            "McCarthy cites 'progress' in U.S. debt ceiling talks with White House - CNBC",
          description:
            'Republican Kevin McCarthy said on Saturday he was making "progress" in negotiations with Democratic President Joe Biden on raising the federal debt ceiling.',
          url: "https://www.cnbc.com/2023/05/27/mccarthy-cites-progress-in-us-debt-ceiling-talks-with-white-house.html",
          urlToImage:
            "https://image.cnbcfm.com/api/v1/image/107246583-1685016833601-gettyimages-1257747319-mccarthy_tw_857_052423.jpeg?v=1685201384&w=1920&h=1080",
          publishedAt: "2023-05-27T15:29:44Z",
          content:
            'Top congressional Republican Kevin McCarthy said on Saturday he was making "progress" in negotiations with Democratic President Joe Biden on raising the federal government\'s debt ceiling, as the nati… [+3362 chars]',
        },
        {
          source: { id: null, name: "Variety" },
          author: "Pat Saperstein",
          title:
            "Box Office: ‘The Little Mermaid’ Swimming to No. 1 With $38 Million Opening Day - Variety",
          description:
            "Disney’s live-action “The Little Mermaid” is making quite the splash at the domestic box office this weekend, with an opening day total of $38 million. The fantasy, which is openi…",
          url: "https://variety.com/2023/film/box-office/box-office-the-little-mermaid-opening-weekend-1235626708/",
          urlToImage:
            "https://variety.com/wp-content/uploads/2023/05/MCDLIME_WD039.jpg?w=1000&h=563&crop=1",
          publishedAt: "2023-05-27T15:22:00Z",
          content:
            "Disney’s live-action “The Little Mermaid” is making quite the splash at the domestic box office this weekend, with an opening day total of $38 million.\r\nThe fantasy, which is opening in 4,320 theater… [+1436 chars]",
        },
        {
          source: { id: null, name: "New York Post" },
          author: "Angela Barbuti",
          title:
            "Colorectal cancer spike in young people could be caused by fungus - New York Post ",
          description:
            "Researchers have found a possible reason as to why rates of colorectal cancer cases have spiked among patients under 50.",
          url: "https://nypost.com/2023/05/27/colorectal-cancer-rise-in-young-may-be-from-fungus/",
          urlToImage:
            "https://nypost.com/wp-content/uploads/sites/2/2023/05/NYPICHPDPICT000011819894.jpg?quality=75&strip=all&w=1024",
          publishedAt: "2023-05-27T15:11:00Z",
          content:
            "Researchers have found a possible reason for a spike in the rate of colorectal cancer cases among patients under 50: a fungus that usually blamed for nail and skin infections.\r\nDoctors at Georgetown … [+2192 chars]",
        },
        {
          source: { id: "cnn", name: "CNN" },
          author: "Ashley Strickland",
          title:
            "Meet the lunar rover that will venture to the moon’s south pole - CNN",
          description:
            "This week, meet the next generation of lunar rovers, glimpse stunning new photos of the solar surface, encounter colorful new species across Asia, learn about an unusual ancient predator, and more.",
          url: "https://www.cnn.com/2023/05/27/world/lunar-rover-science-newsletter-wt-scn/index.html",
          urlToImage:
            "https://media.cnn.com/api/v1/images/stellar/prod/230523150232-viper-lunar-rovers-spc-intl-1.jpg?c=16x9&q=w_800,c_fill",
          publishedAt: "2023-05-27T15:00:00Z",
          content:
            "Editors Note: A version of this story appeared in CNNs Wonder Theory science newsletter. To get it in your inbox, sign up for free here.\r\nAt the heart of human nature is a desire to explore. Nowhere … [+4680 chars]",
        },
        {
          source: { id: "usa-today", name: "USA Today" },
          author: "Nick Wojton",
          title:
            "Bills players are already trying to recruit DeAndre Hopkins - Bills Wire",
          description: "The #Bills locker room are doing their due diligence:",
          url: "https://billswire.usatoday.com/lists/buffalo-bills-recruit-deandre-hopkins-von-miller-dion-dawkins/",
          urlToImage:
            "https://billswire.usatoday.com/wp-content/uploads/sites/65/2020/11/USATSI_15090248.jpg?w=1024&h=576&crop=1",
          publishedAt: "2023-05-27T14:16:00Z",
          content:
            "After the big news in the NFL at the end of this week, some Buffalo Bills players did their due diligence… really quick.\r\nOn Friday, the Arizona Cardinals released receiver DeAndre Hopkins. That come… [+266 chars]",
        },
        {
          source: { id: null, name: "Air Alamo" },
          author: "Ty Jager",
          title:
            "What to make of the Spurs looking to trade for another first-round pick - Air Alamo",
          description:
            "The San Antonio Spurs are looking to add another first-round pick in the 2023 NBA Draft, so what does that tell us about their plans for the future of the team?",
          url: "https://airalamo.com/posts/what-to-make-of-spurs-looking-to-trade-for-another-first-round-pick",
          urlToImage:
            "https://images2.minutemediacdn.com/image/upload/c_crop,w_3000,h_1687,x_0,y_0/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/29/01h19smz15z25y0de2wp.jpg",
          publishedAt: "2023-05-27T14:00:08Z",
          content:
            "After winning the Wembanyama sweepstakes earlier this month, the San Antonio Spurs reportedly aren't finished building through the 2023 NBA Draft. According to Rafael Barlowe of NBA Big Board, the Sp… [+7559 chars]",
        },
        {
          source: { id: "business-insider", name: "Business Insider" },
          author: "Sam Tabahriti",
          title:
            "There's one big reason why workers don't want to go back to the office - Business Insider",
          description:
            "The pandemic allowed many people to reclaim the time spent commuting twice a day, and now many don't want to get back in the car or on the train.",
          url: "https://www.businessinsider.com/one-big-reason-why-workers-not-back-to-office-commuting-2023-5",
          urlToImage:
            "https://i.insider.com/646f307450731c001938b13a?width=1200&format=jpeg",
          publishedAt: "2023-05-27T13:00:00Z",
          content:
            'While Elon Musk may think remote work is "morally wrong," the pandemic proved that being in the office is not essential to doing a wide range of jobs.\r\nBut many businesses have nevertheless started t… [+2655 chars]',
        },
        {
          source: { id: "abc-news", name: "ABC News" },
          author: "BRIAN P. D. HANNON",
          title:
            "Former US diplomat Henry Kissinger celebrates 100th birthday, still active in global affairs - ABC News",
          description:
            "Former diplomat and presidential advisor Henry Kissinger is marking his 100th birthday, outlasting many of his political contemporaries who guided the United States through one of its most tumultuous periods including the presidency of Richard Nixon an...",
          url: "https://abcnews.go.com/US/wireStory/former-us-diplomat-henry-kissinger-celebrates-100th-birthday-99648941",
          urlToImage:
            "https://s.abcnews.com/images/US/wirestory_565d48b7604ee179d104555490686224_16x9_992.jpg",
          publishedAt: "2023-05-27T12:38:41Z",
          content:
            "Former diplomat and presidential advisor Henry Kissinger marks his 100th birthday on Saturday, outlasting many of his political contemporaries who guided the United States through one of its most tum… [+3120 chars]",
        },
        {
          source: { id: null, name: "YouTube" },
          author: null,
          title:
            "Blastoff! SpaceX launches big Arabsat BADR-8 satellite, nails landing - VideoFromSpace",
          description:
            "A SpaceX Falcon 9 rocket launched the nearly 5 ton Arabsat BADR-8 telecommunications satellite from Cape Canaveral Space Force Station in Florida on May 27, ...",
          url: "https://www.youtube.com/watch?v=GNYXqgKdnco",
          urlToImage: "https://i.ytimg.com/vi/GNYXqgKdnco/maxresdefault.jpg",
          publishedAt: "2023-05-27T12:30:59Z",
          content: null,
        },
        {
          source: { id: "usa-today", name: "USA Today" },
          author: "Karen Weintraub",
          title:
            "Long COVID symptoms finally identified: What this means for treatment - USA TODAY",
          description:
            "Researchers can finally identify the symptoms of long COVID thanks to a study of 10,000 Americans. Here's what that means for treatment.",
          url: "https://www.usatoday.com/story/news/health/2023/05/25/long-covid-symptoms-study/70253900007/",
          urlToImage:
            "https://www.usatoday.com/gcdn/presto/2023/05/18/USAT/db63def9-f7ce-4a87-b64f-2cb21d625a79-GettyImages-1406496671.jpg?crop=5404,3040,x0,y352&width=3200&height=1801&format=pjpg&auto=webp",
          publishedAt: "2023-05-27T12:16:08Z",
          content:
            "A clearer picture of what's become known as long COVID-19 is starting to emerge, which should eventually allow researchers to treat symptoms that can devastate people's lives for months or years afte… [+7399 chars]",
        },
        {
          source: { id: "the-washington-post", name: "The Washington Post" },
          author: "Heather Kelly",
          title:
            "What are Netflix’s password sharing rules, and why are people angry - The Washington Post",
          description:
            "The streaming company wants to charge $7.99 a month for extra users, but many are upset about another monthly charge.",
          url: "https://www.washingtonpost.com/technology/2023/05/27/netflix-password-sharing-why-users-mad/",
          urlToImage:
            "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/AWESEMD3NJACHIXWGR2WCCRZUU.jpg&w=1440",
          publishedAt: "2023-05-27T12:16:04Z",
          content:
            "Comment on this story\r\nComment\r\nEvery three months, Brandy Andersen fills her Jeep with clothes, kitchen supplies, a box fan and a small TV and relocates to a new city. A traveling emergency room nur… [+8790 chars]",
        },
        {
          source: { id: null, name: "CNET" },
          author: null,
          title: "Everything I Hope Apple Adds to iOS 17 for the iPhone - CNET",
          description:
            "The next version of iPhone software is expected at WWDC. Hopefully the new iOS has all these features.",
          url: "https://www.cnet.com/tech/services-and-software/everything-i-hope-apple-adds-to-ios-17-for-the-iphone/",
          urlToImage:
            "https://www.cnet.com/a/img/resize/392f473ebe19a260d1dd743f4629e8eb16b9cdda/hub/2021/09/17/44cf514f-e83b-410f-8ffe-bb0616f0a78a/p1017146.jpg?auto=webp&fit=crop&height=675&width=1200",
          publishedAt: "2023-05-27T12:00:00Z",
          content:
            "Apple will hold its Worldwide Developers Conference keynote presentation on June 5, where CEO Tim Cook and gang are expected to announce the next major version of iPhone software, iOS 17. Though rumo… [+10742 chars]",
        },
        {
          source: { id: "cbs-news", name: "CBS News" },
          author: null,
          title:
            "Funeral director in Indiana pleads guilty to 40 theft counts after decomposing bodies discovered - CBS News",
          description:
            "Randy Lankford, owner of Lankford Funeral Home and Family Center in Jeffersonville, faces a proposed sentence of 12 years.",
          url: "https://www.cbsnews.com/news/indiana-funeral-director-pleads-guilty-to-theft-after-decomposing-bodies-found/",
          urlToImage:
            "https://assets1.cbsnewsstatic.com/hub/i/r/2023/05/26/518893c3-e874-45d5-b721-57f72ddb20ff/thumbnail/1200x630/726a10ccd60d9dc1a0a78432de3d11af/gettyimages-1327894263.jpg",
          publishedAt: "2023-05-27T11:32:56Z",
          content:
            "The director of a southern Indiana funeral home where 31 decomposing bodies and the cremains of 17 others were found pleaded guilty Friday to more than 40 counts of felony theft.\r\nRandy Lankford, own… [+1413 chars]",
        },
        {
          source: { id: "business-insider", name: "Business Insider" },
          author: "Ayelet Sheffey",
          title:
            "Retirees risk losing Social Security benefits in days without debt ceiling solution - Business Insider",
          description:
            '"We\'re going to see people not being able to buy food, not being able to pay the rent," a Social Security expert said of a potential default.',
          url: "https://www.businessinsider.com/what-will-happen-to-social-security-in-default-debt-ceiling-2023-5",
          urlToImage:
            "https://i.insider.com/6470be8e085acb0018fe9f34?width=1200&format=jpeg",
          publishedAt: "2023-05-27T11:10:00Z",
          content:
            "The US could default on its debt in a matter of days and retirees will be the among the first to experience the consequences.\r\nTreasury Secretary Janet Yellen warned Speaker of the House Kevin McCart… [+4825 chars]",
        },
      ],
    };
    data.articles.map((_, index) => (data.articles[index].id = index));
    setArticles(data.articles);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View className="mb-5 flex-row justify-center gap-3 border-b-2 pb-5">
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: item.urlToImage,
          }}
        />
        <View className="flex-1">
          <TouchableOpacity
            className="mb-2"
            onPress={() => {
              setActivePost(item.title);
              setSummaryLoading(true);
              axios
                .get(`${API_URL}/api/summarize/news?url=${item.url}`)
                .then(({ data }) => {
                  setSummaryLoading(false);
                  setSummary(data.summary);
                });
              setModalVisible(true);
            }}
          >
            <Text className="text-xl leading-5 font-bold">{item.title}</Text>
          </TouchableOpacity>
          <Text>{item.description}</Text>
          <View className="flex-row mt-2">
            <Text className="max-w-[200px]">
              Author: {item.author ? item.author : "None"}
            </Text>
            <View className="flex-1"></View>
            <Text>{item.publishedAt}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="p-6">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          className="flex-1 justify-center items-center mt-[22px]"
          onPress={() => setModalVisible(false)}
        >
          <View
            className="bg-white rounded-2xl p-[35px] w-3/4 items-center shadow-5xl"
            style={{ elevation: 5 }}
          >
            <Text className="mb-[15px]">{activePost}</Text>
            <Text>{summaryLoading ? "Loading..." : summary}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        data={articles}
      />
    </SafeAreaView>
  );
};

export default TopNews;
