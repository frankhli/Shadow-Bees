"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockHostels = exports.hostelsData = void 0;
exports.getHostelById = getHostelById;
exports.getHostelsByCity = getHostelsByCity;
exports.getFeaturedHostels = getFeaturedHostels;
exports.searchHostels = searchHostels;
const allImages = [
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&fit=crop&sig=0-0',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&fit=crop&sig=0-1',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&fit=crop&sig=0-2',
    'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&fit=crop&sig=0-3',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop&sig=0-4',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&fit=crop&sig=1-0',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&fit=crop&sig=1-1',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&fit=crop&sig=1-2',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&fit=crop&sig=1-3',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&fit=crop&sig=1-4',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop&sig=2-0',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&fit=crop&sig=2-1',
    'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&fit=crop&sig=2-2',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&fit=crop&sig=2-3',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop&sig=2-4',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&fit=crop&sig=3-0',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&fit=crop&sig=3-1',
    'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&fit=crop&sig=3-2',
    'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&fit=crop&sig=3-3',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop&sig=3-4',
    'https://images.unsplash.com/photo-1600573472592-ee9b68d14c68?w=800&fit=crop&sig=4-0',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&fit=crop&sig=4-1',
    'https://images.unsplash.com/photo-1600566752421-68ca0f6e3f84?w=800&fit=crop&sig=4-2',
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&fit=crop&sig=4-3',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&fit=crop&sig=4-4',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&fit=crop&sig=5-0',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&fit=crop&sig=5-1',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&fit=crop&sig=5-2',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&fit=crop&sig=5-3',
    'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&fit=crop&sig=5-4',
    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&fit=crop&sig=6-0',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&fit=crop&sig=6-1',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&fit=crop&sig=6-2',
    'https://images.unsplash.com/photo-1512918760513-95f1926315b7?w=800&fit=crop&sig=6-3',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop&sig=6-4',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&fit=crop&sig=7-0',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&fit=crop&sig=7-1',
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&fit=crop&sig=7-2',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop&sig=7-3',
    'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&fit=crop&sig=7-4',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&fit=crop&sig=8-0',
    'https://images.unsplash.com/photo-1600210491369-7538f1c5a3fc?w=800&fit=crop&sig=8-1',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&fit=crop&sig=8-2',
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&fit=crop&sig=8-3',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop&sig=8-4',
    'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&fit=crop&sig=9-0',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&fit=crop&sig=9-1',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&fit=crop&sig=9-2',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&fit=crop&sig=9-3',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&fit=crop&sig=9-4',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&fit=crop&sig=10-0',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&fit=crop&sig=10-1',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&fit=crop&sig=10-2',
    'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800&fit=crop&sig=10-3',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&fit=crop&sig=10-4',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&fit=crop&sig=11-0',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&fit=crop&sig=11-1',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&fit=crop&sig=11-2',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&fit=crop&sig=11-3',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&fit=crop&sig=11-4',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&fit=crop&sig=12-0',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&fit=crop&sig=12-1',
    'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&fit=crop&sig=12-2',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&fit=crop&sig=12-3',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop&sig=12-4',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&fit=crop&sig=13-0',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&fit=crop&sig=13-1',
    'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&fit=crop&sig=13-2',
    'https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&fit=crop&sig=13-3',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&fit=crop&sig=13-4',
    'https://images.unsplash.com/photo-1600573472592-ee9b68d14c68?w=800&fit=crop&sig=14-0',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&fit=crop&sig=14-1',
    'https://images.unsplash.com/photo-1600566752421-68ca0f6e3f84?w=800&fit=crop&sig=14-2',
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&fit=crop&sig=14-3',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&fit=crop&sig=14-4',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&fit=crop&sig=15-0',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&fit=crop&sig=15-1',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&fit=crop&sig=15-2',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&fit=crop&sig=15-3',
    'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&fit=crop&sig=15-4',
    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&fit=crop&sig=16-0',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&fit=crop&sig=16-1',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&fit=crop&sig=16-2',
    'https://images.unsplash.com/photo-1512918760513-95f1926315b7?w=800&fit=crop&sig=16-3',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop&sig=16-4',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&fit=crop&sig=17-0',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&fit=crop&sig=17-1',
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&fit=crop&sig=17-2',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop&sig=17-3',
    'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&fit=crop&sig=17-4',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&fit=crop&sig=18-0',
    'https://images.unsplash.com/photo-1600210491369-7538f1c5a3fc?w=800&fit=crop&sig=18-1',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&fit=crop&sig=18-2',
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&fit=crop&sig=18-3',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&fit=crop&sig=18-4',
    'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&fit=crop&sig=19-0',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&fit=crop&sig=19-1',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&fit=crop&sig=19-2',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&fit=crop&sig=19-3',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&fit=crop&sig=19-4'
];
function getImagesForHostel(index) {
    const startIdx = index * 5;
    return [
        allImages[startIdx],
        allImages[startIdx + 1],
        allImages[startIdx + 2],
        allImages[startIdx + 3],
        allImages[startIdx + 4],
    ];
}
function createHostel(id, name, nameCn, city, district, address, description, imageIndex, options = {}) {
    const basePrice = options.pricePerNight || Math.floor(Math.random() * 10) + 10;
    return {
        id, name, nameCn, city, district, address, description,
        pricePerNight: basePrice,
        originalPrice: basePrice + Math.floor(Math.random() * 5) + 2,
        cleaningFee: 5,
        serviceFee: Math.floor(basePrice * 0.1),
        currency: 'USD',
        rating: Number((Math.random() * 1.0 + 4.0).toFixed(1)),
        reviewCount: Math.floor(Math.random() * 200) + 50,
        images: getImagesForHostel(imageIndex),
        badges: options.badges || ['Good Location'],
        propertyType: options.propertyType || 'hostel',
        coordinates: options.coordinates || { lat: 30 + Math.random() * 8, lng: 110 + Math.random() * 15 },
        nearestMetro: `${district} Station`,
        distanceToAttraction: '10 min walk',
        distanceToDivingPirate: `${Math.floor(Math.random() * 15) + 3} min`,
        roomTypes: [
            { id: `${id}-4bed`, name: '4-Bed Mixed Dorm', bedCount: 4, pricePerBed: basePrice, gender: 'mixed', amenities: ['AC', 'Locker'], availableBeds: Math.floor(Math.random() * 3) + 4 },
            { id: `${id}-6bed`, name: '6-Bed Mixed Dorm', bedCount: 6, pricePerBed: Math.max(8, basePrice - 3), gender: 'mixed', amenities: ['AC', 'Locker'], availableBeds: Math.floor(Math.random() * 4) + 4 },
            { id: `${id}-female`, name: '4-Bed Female Dorm', bedCount: 4, pricePerBed: basePrice + 1, gender: 'female', amenities: ['AC', 'Locker', 'Ensuite'], availableBeds: Math.floor(Math.random() * 3) + 2 },
        ],
        amenities: ['Free WiFi', 'Kitchen', 'Laundry', 'AC', '24h Reception', 'Lockers'],
        facilities: [
            { icon: 'Wifi', label: '免费WiFi', labelEn: 'Free WiFi' },
            { icon: 'UtensilsCrossed', label: '共享厨房', labelEn: 'Shared Kitchen' },
            { icon: 'Waves', label: '洗衣房', labelEn: 'Laundry' },
            { icon: 'Lock', label: '储物柜', labelEn: 'Lockers' },
        ],
        commonAreas: ['Common Room', 'Kitchen', 'Rooftop'],
        weeklyEvents: [
            { day: 'Monday', event: 'Movie Night', time: '20:00' },
            { day: 'Wednesday', event: 'Language Exchange', time: '19:00' },
            { day: 'Friday', event: 'Pub Crawl', time: '21:00' },
        ],
        host: {
            name: `Host ${city}`,
            nameCn: `${city}主人`,
            since: 2018 + Math.floor(Math.random() * 5),
            languages: ['English', 'Chinese'],
            responseRate: `${90 + Math.floor(Math.random() * 9)}%`,
            responseTime: 'within 1 hour',
            bio: `Welcome to our hostel in ${city}!`,
        },
        reviews: [],
        availableDates: [{ start: '2026-03-01', end: '2026-12-31' }],
        checkInTime: '14:00',
        checkOutTime: '11:00',
        cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
        houseRules: ['No smoking in rooms', 'Quiet hours 23:00-07:00'],
    };
}
const hostelsData = [
    createHostel('sh-001', 'The Diving Pirate Hostel', '跳海青年旅舍', 'Shanghai', 'Jing\'an', '456 West Nanjing Road', 'Located in the heart of Shanghai, steps from Diving Pirate Bar.', 0, { badges: ['Top Rated', 'Social Hub'] }),
    createHostel('sh-002', 'French Concession Guesthouse', '法租界民宿', 'Shanghai', 'Xuhui', '88 Wukang Road', 'Charming guesthouse in historic French Concession.', 1, { badges: ['Historic'], propertyType: 'guesthouse' }),
    createHostel('sh-003', 'Bund View Hostel', '外滩观景青旅', 'Shanghai', 'Huangpu', '200 East Nanjing Road', 'Steps from Bund with stunning skyline views.', 2, { badges: ['Bund View'] }),
    createHostel('bj-001', 'Hutong Hideout', '胡同隐秘', 'Beijing', 'Dongcheng', '15 Nanluoguxiang', 'Authentic hutong courtyard near Forbidden City.', 3, { badges: ['Superhost'], propertyType: 'guesthouse' }),
    createHostel('bj-002', 'Drum Tower Youth Hostel', '鼓楼青年旅舍', 'Beijing', 'Dongcheng', '51 Gulou East Street', 'Steps from iconic Drum Tower.', 4, { badges: ['Drum Tower View'] }),
    createHostel('cd-001', 'Panda Base Hostel', '熊猫基地青旅', 'Chengdu', 'Chenghua', '88 Panda Avenue', 'Panda-themed hostel near Giant Panda Base.', 5, { badges: ['Panda Themed'] }),
    createHostel('cd-002', 'Jinli Ancient Street Hostel', '锦里古街青旅', 'Chengdu', 'Wuhou', '231 Wuhou Street', 'Near Jinli Ancient Street.', 6, { badges: ['Ancient Street'], propertyType: 'guesthouse' }),
    createHostel('cd-003', 'Tianfu Square Hostel', '天府广场青旅', 'Chengdu', 'Qingyang', '9 Tianfu Square', 'City center with metro access.', 7, { badges: ['City Center'] }),
    createHostel('xa-001', 'Muslim Quarter Hostel', '回民街青旅', 'Xi\'an', 'Lianhu', '45 Beiyuanmen', 'Located in Muslim Quarter, famous for street food.', 8, { badges: ['Street Food'] }),
    createHostel('xa-002', 'Bell Tower Central Hostel', '钟楼中心青旅', 'Xi\'an', 'Lianhu', '1 South Street', 'Right at Bell Tower, center of Xi\'an.', 9, { badges: ['City Center'] }),
    createHostel('gz-001', 'Pearl River Hostel', '珠江青旅', 'Guangzhou', 'Yuexiu', '123 Beijing Road', 'Modern hostel by Pearl River.', 10, { badges: ['River View'] }),
    createHostel('gz-002', 'Shamian Island Guesthouse', '沙面岛民宿', 'Guangzhou', 'Liwan', '54 Shamian Street', 'Historic European colonial architecture.', 11, { badges: ['Historic'], propertyType: 'guesthouse' }),
    createHostel('sz-001', 'Tech City Hostel', '科技之城青旅', 'Shenzhen', 'Nanshan', '88 Shennan Avenue', 'In tech district for digital nomads.', 12, { badges: ['Tech Hub'] }),
    createHostel('sz-002', 'Window of the World Hostel', '世界之窗青旅', 'Shenzhen', 'Nanshan', '9037 Shennan Avenue', 'Near Window of the World theme park.', 13, { badges: ['Theme Park'] }),
    createHostel('hz-001', 'West Lake Hostel', '西湖青旅', 'Hangzhou', 'Xihu', '66 Nanshan Road', 'Peaceful hostel by West Lake.', 14, { badges: ['Lake View'] }),
    createHostel('hz-002', 'Longjing Tea Village Guesthouse', '龙井茶村民宿', 'Hangzhou', 'Xihu', '38 Longjing Village', 'Famous Longjing tea village.', 15, { badges: ['Tea Village'], propertyType: 'guesthouse' }),
    createHostel('cq-001', 'Mountain City Hostel', '山城青旅', 'Chongqing', 'Yuzhong', '88 Jiefangbei', 'Experience 8D magic city!', 16, { badges: ['8D City', 'Hotpot'] }),
    createHostel('cq-002', 'Hongya Cave Guesthouse', '洪崖洞民宿', 'Chongqing', 'Yuzhong', '88 Cangbai Road', 'Near stunning Hongya Cave.', 17, { badges: ['Night View'], propertyType: 'guesthouse' }),
    createHostel('cs-001', 'Spicy City Hostel', '辣味之城青旅', 'Changsha', 'Tianxin', '66 Pozi Street', 'Heart of food street!', 18, { badges: ['Food Paradise'] }),
    createHostel('cs-002', 'Orange Isle Hostel', '橘子洲青旅', 'Changsha', 'Yuelu', '2 Orange Isle', 'Located on Orange Isle.', 19, { badges: ['Island'] }),
];
exports.hostelsData = hostelsData;
exports.mockHostels = hostelsData;
function getHostelById(id) {
    return hostelsData.find(h => h.id === id);
}
function getHostelsByCity(city) {
    return hostelsData.filter(h => h.city.toLowerCase() === city.toLowerCase());
}
function getFeaturedHostels(limit = 6) {
    return [...hostelsData].sort((a, b) => b.rating - a.rating).slice(0, limit);
}
function searchHostels(query) {
    const q = query.toLowerCase();
    return hostelsData.filter(h => h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q));
}
//# sourceMappingURL=hostels.mock.js.map