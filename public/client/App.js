const products = [
  {
    id: "5603-fv0lsg364t6",
    size: 30,
    price: 974,
    face: "( .-. )",
    date: "Wed Aug 14 2019 23:23:05 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "23330-1acar0qiopi",
    size: 17,
    price: 781,
    face: "( .o.)",
    date: "Mon Aug 05 2019 12:23:48 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "13660-77fysmtrb5x",
    size: 13,
    price: 758,
    face: "( `·´ )",
    date: "Fri Aug 09 2019 23:58:07 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "72638-n8ueclqsnx",
    size: 35,
    price: 444,
    face: "( ° ͜ ʖ °)",
    date: "Tue Aug 13 2019 16:21:36 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "9664-7jx3667i5cv",
    size: 13,
    price: 264,
    face: "( ͡° ͜ʖ ͡°)",
    date: "Mon Aug 12 2019 22:38:17 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "25280-h0kv3s9lqbd",
    size: 29,
    price: 523,
    face: "( ⚆ _ ⚆ )",
    date: "Mon Aug 05 2019 06:38:07 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "93386-r5gkjkx0278",
    size: 22,
    price: 479,
    face: "( ︶︿︶)",
    date: "Mon Aug 12 2019 18:40:18 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "4847-eg21sgtjgmk",
    size: 26,
    price: 999,
    face: "( ﾟヮﾟ)",
    date: "Tue Aug 13 2019 16:31:54 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "15318-8nfxp980tin",
    size: 22,
    price: 945,
    face: "(\\/)(°,,,°)(\\/)",
    date: "Wed Aug 07 2019 15:49:30 GMT+0100 (Central European Standard Time)"
  },
  {
    id: "83407-hqan125a39e",
    size: 16,
    price: 578,
    face: "(¬_¬)",
    date: "Tue Aug 13 2019 08:20:44 GMT+0100 (Central European Standard Time)"
  }
];

const sortByOptions = { 0: "", 1: "id", 2: "price", 3: "size" };

const App = () => {
  const [activeSortByOptionId, setActiveSortByOptionId] = useState("");
  return (
    <div className="app-container">
      <Header
        sortByOptions={sortByOptions}
        activeSortByOptionId={activeSortByOptionId}
        onClickOption={setActiveSortByOptionId}
      />
      <ProductList products={products} />;
    </div>
  );
};
