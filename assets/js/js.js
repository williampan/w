// Hi.

var WP = WP || {};

Date.prototype.addDays = function (days) {
    var newDate = new Date(this.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

WP.chineseDate = {
    date: null,

    make: function (date) {
        var ChineseDate = {};

        function getSuffix(n) {
            if (n % 10 === 1 && n % 100 !== 11) {
                return "st";
            } else if (n % 10 === 2 && n % 100 !== 12) {
                return "nd";
            } else if (n % 10 === 3 && n % 100 !== 13) {
                return "rd";
            } else {
                return "th";
            }
        }

        ChineseDate.gregorianYear = date.getFullYear();
        ChineseDate.gregorianMonth = date.getMonth() + 1;
        ChineseDate.gregorianDate = date.getDate();

        // Get Chinese date string

        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };

        var westernString = date.toLocaleString('en-US-u-ca-chinese', options);
        var numArray = westernString.split('/');

        var mString = numArray[0];
        var isLeapMonth = (mString.indexOf('bis') > -1); // Leap month, e.g. '9bis'
        var m = parseInt(mString.split('b')[0]);
        var d = parseInt(numArray[1]);
        var y = parseInt(numArray[2]);

        // Year

        var stemIndex = (y % 10 === 0)
            ? 10
            : y % 10;
        var branchIndex = (y % 12 === 0)
            ? 12
            : y % 12;

        var stems = ['', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        var branches = ['', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        var elements = ['', '木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];
        var zodiac = ['', '鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '鷄', '狗', '猪'];

        var stemsPinyin = ['', 'jiǎ', 'yǐ', 'bǐng', 'dīng', 'wù', 'jǐ', 'gēng', 'xīn', 'rén', 'guǐ'];
        var branchesPinyin = ['', 'zǐ', 'chǒu', 'yín', 'mǎo', 'chén', 'sì', 'wǔ', 'wèi', 'shēn', 'yǒu', 'xū', 'hài'];
        var elementsPinyin = ['', 'mù', 'mù', 'huǒ', 'huǒ', 'tǔ', 'tǔ', 'jīn', 'jīn', 'shuǐ', 'shuǐ'];
        var zodiacPinyin = ['', 'shǔ', 'niú', 'hǔ', 'tù', 'lóng', 'shé', 'mǎ', 'yáng', 'hóu', 'jī', 'gǒu', 'zhū'];

        var elementsEnglish = ['', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth', 'Metal', 'Metal', 'Water', 'Water'];
        var zodiacEnglish = ['', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

        ChineseDate.year = {
            string: stems[stemIndex] + branches[branchIndex],
            pinyin: stemsPinyin[stemIndex] + branchesPinyin[branchIndex],
            english: 'The ' + y + getSuffix(y) + ' Year in the Sexagenary Cycle' + ' '
                    + '(' + stemIndex + getSuffix(stemIndex) + ' ' + 'Celestial Stem,' + ' '
                    + branchIndex + getSuffix(branchIndex) + ' Earthly Branch)',
            elaboration: '<p>Years are measured in 60-year cycles.' + ' '
                    + 'Each successive year introduces the next Celestial Stem in the cycle of ten' + ' '
                    + 'and the next Earthly Branch in the cycle of twelve.</p>' + ' '
                    + '<p>The sexagenary cycle first appeared circa 1,300 BCE' + ' '
                    + 'on Shang dynasty oracle bones as a system for recording days,' + ' '
                    + 'and was adapted around the 3rd century BCE to record the years.' + ' '
                    + 'Under Shang-dynasty belief there were ten suns, ' + ' '
                    + 'which appeared in order in a ten-day cycle, and the Celestial Stems are the names of these suns.' + ' '
                    + 'The Earthly Branches are based upon observations of the orbit of Jupiter, the Earth star.</p>'

        };

        ChineseDate.zodiac = {
            string: elements[stemIndex] + zodiac[branchIndex] + '年',
            pinyin: elementsPinyin[stemIndex] + zodiacPinyin[branchIndex] + 'nián',
            english: 'Year of the ' + elementsEnglish[stemIndex] + ' '
                    + zodiacEnglish[branchIndex],
            elaboration: 'Each pair of Celestial Stems corresponds to one of the five elements,' + ' '
                    + 'and each Earthly Branch corresponds to one of the zodiac animals.'
        };

        // Month

        var months = ['', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '臘'];
        var monthsPinyin = ['', 'zhèng', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ', 'shí', 'dōng', 'là'];

        var monthString = months[m] + '月';
        var monthPinyin = monthsPinyin[m] + 'yùe';
        var monthEnglish = m + getSuffix(m) + ' ' + 'Month';

        if (isLeapMonth) {
            monthString = '閏' + monthString;
            monthPinyin = 'rùn' + monthPinyin;
            monthEnglish = 'Leap' + ' ' + monthEnglish;
        }

        ChineseDate.month = {
            string: monthString,
            pinyin: monthPinyin,
            english: monthEnglish,
            elaboration: 'Each month begins with a new moon, and there are 12 months in the year,' + ' '
                    + 'with a leap month inserted every 2 or 3 years.' + ' '
                    + 'Leap months are inserted according to calculations of lunar phases' + ' '
                    + 'and can appear at any time in the year.'
        };

        // Date

        var digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        var digitsPinyin = ['', 'yī', '’èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ', 'shí'];

        var dateString = '';
        var datePinyin = '';
        if (d <= 10) {
            dateString = '初' + digits[d];
            datePinyin = 'chū' + digitsPinyin[d];
        } else if (d < 20) {
            dateString = '十' + digits[d % 10];
            datePinyin = 'shí' + digitsPinyin[d % 10];
        } else if (d === 20) {
            dateString = '二十';
            datePinyin = 'èrshí';
        } else if (d < 30) {
            dateString = '廿' + digits[d % 10];
            datePinyin = 'niàn' + digitsPinyin[d % 10];
        } else if (d === 30) {
            dateString = '三十';
            datePinyin = 'sānshí';
        }
        dateString = dateString;
        datePinyin = datePinyin;

        ChineseDate.date = {
            string: dateString,
            pinyin: datePinyin,
            english: d + getSuffix(d) + ' ' + 'Day',
            elaboration: 'There are 29 or 30 days in a month, ' + ' '
                    + 'depending on the length of the lunar cycle.' + ' '
                    + 'Since each month begins with a new moon, the full moon always occurs' + ' '
                    + 'around the 15th day.'
        };

        // Solar Terms

        // These may be off by one day depending on the year,
        // because we don't have live data for longitude degrees
        // along the ecliptic

        var solarTerms = {
             '204': '立春',
             '219': '雨水',
             '306': '驚蟄',
             '321': '春分',
             '405': '清明',
             '420': '穀雨',
             '506': '立夏',
             '521': '小滿',
             '606': '芒種',
             '621': '夏至',
             '707': '小暑',
             '723': '大暑',
             '808': '立秋',
             '823': '處暑',
             '908': '白露',
             '923': '秋分',
            '1008': '寒露',
            '1024': '霜降',
            '1108': '立冬',
            '1122': '小雪',
            '1207': '大雪',
            '1222': '冬至',
             '106': '小寒',
             '120': '大寒'
        };

        var solarTermsPinyin = {
             '204': 'lìchūn',
             '219': 'yǔshuǐ',
             '306': 'jīngzhé',
             '321': 'chūnfēn',
             '405': 'qīngmíng',
             '420': 'gǔyǔ',
             '506': 'lìxià',
             '521': 'xiǎomǎn',
             '606': 'mángzhǒng',
             '621': 'xiàzhì',
             '707': 'xiǎoshǔ',
             '723': 'dàshǔ',
             '808': 'lìqiū',
             '823': 'chǔshǔ',
             '908': 'báilù',
             '923': 'qiūfēn',
            '1008': 'hánlù',
            '1024': 'shuāngjiàng',
            '1108': 'lìdōng',
            '1122': 'xiǎoxuě',
            '1207': 'dàxuě',
            '1222': 'dōngzhì',
             '106': 'xiǎohán',
             '120': 'dàhán'
        };

        var solarTermsEnglish = {
             '204': 'Start of Spring',
             '219': 'Rain Water',
             '306': 'Awakening of Insects',
             '321': 'Vernal Equinox',
             '405': 'Clear and Bright',
             '420': 'Grain Rain',
             '506': 'Start of Summer',
             '521': 'Grain Full',
             '606': 'Grain in Ear',
             '621': 'Summer Solstice',
             '707': 'Minor Heat',
             '723': 'Major Heat',
             '808': 'Start of Autumn',
             '823': 'Limit of Heat',
             '908': 'White Dew',
             '923': 'Autumnal Equinox',
            '1008': 'Cold Dew',
            '1024': 'Frost Descent',
            '1108': 'Start of Winter',
            '1122': 'Minor Snow',
            '1207': 'Major Snow',
            '1222': 'Winter Solstice',
             '106': 'Minor Cold',
             '120': 'Major Cold'
        };

        var solarTermAvailable = false,
            solarTermString = '',
            solarTermPinyin = '',
            solarTermEnglish = '';

        if (!isLeapMonth) {
            var gregorianMMDD = ChineseDate.gregorianMonth * 100 + ChineseDate.gregorianDate;

            if (solarTerms.hasOwnProperty(gregorianMMDD)) {
                solarTermAvailable = true;
                solarTermString = solarTerms[gregorianMMDD];
                solarTermPinyin = solarTermsPinyin[gregorianMMDD];
                solarTermEnglish = solarTermsEnglish[gregorianMMDD];
            }
        }

        ChineseDate.solarTerm = {
            available: solarTermAvailable,
            string: solarTermString,
            pinyin: solarTermPinyin,
            english: solarTermEnglish,
            elaboration: 'There are 24 solar terms, determined by the apparent motion of the sun: a new solar terms occurs with every 15° of the sun’s movement. Solar terms thus occur about every fifteen days, and were used by agricultural society to stay synchronized with the seasons.'
        };

        // Holidays

        var holidays = {
             '101': '新年',
             '303': '上巳節',
             '505': '端午節',
             '707': '七夕',
             '909': '重陽節',

             '115': '元宵節',
             '715': '中元節',
             '815': '中秋節',
            '1015': '下元節',

            '1208': '臘八節',
            // '1224': '祭灶節', // 23rd in Northern China
            '1230': '除夕'
        };

        var holidaysPinyin = {
             '101': 'xīnnián',
             '303': 'shàngsìjié',
             '505': 'duānwǔjié',
             '707': 'qīxì',
             '909': 'chóngyángjié',

             '115': 'yuánxiāojié',
             '715': 'zhōngyuánjié',
             '815': 'zhōngqiūjié',
            '1015': 'xiàyuánjié',

            '1208': 'làbājié',
            // '1224': '祭灶節', // 23rd in Northern China
            '1230': 'chúxì'
        };

        var holidaysEnglish = {
             '101': 'New Year',
             '303': 'Shangsi Festival',
             '505': 'Dragon Boat Festival',
             '707': 'Magpie Festival',
             '909': 'Double Ninth Festival',

             '115': 'Lantern Festival',
             '715': 'Ghost Festival',
             '815': 'Mid-Autumn Festival',
            '1015': 'Spirit Festival',

            '1208': 'Laba Festival',
            // '1224': '祭灶節', // 23rd in Northern China
            '1230': 'New Year’s Eve'
        };

        var holidayAvailable = false,
            holidayString = '',
            holidayPinyin = '',
            holidayEnglish = '';

        if (!isLeapMonth) {
            var MMDD = m * 100 + d;

            if (holidays.hasOwnProperty(MMDD)) {
                holidayAvailable = true;
                holidayString = holidays[MMDD];
                holidayPinyin = holidaysPinyin[MMDD];
                holidayEnglish = holidaysEnglish[MMDD];
            }

            // New Year's Eve on 29-day month
            if (MMDD === 1229) {
                var tomorrow = date.addDays(1);
                var s = tomorrow.toLocaleString('en-US-u-ca-chinese', options);
                var monthTomorrow = s.split('/')[0];

                if (monthTomorrow === 1) {
                    holidayAvailable = true;
                    holidayString = '除夕';
                    holidayPinyin = 'chúxì';
                    holidayEnglish = 'New Year’s Eve';
                }
            }
        }

        ChineseDate.holiday = {
            available: holidayAvailable,
            string: holidayString,
            pinyin: holidayPinyin,
            english: holidayEnglish,
            elaboration: 'Chinese holidays often occur on the 15th lunar day,' + ' '
                    + 'at the time of the full moon;' + ' '
                    + 'or when the day is the same number as the month.'
        };

        // Full strings (for testing)

        ChineseDate.full = {
            string: ChineseDate.year.string + ' '
                    + ChineseDate.zodiac.string + ' '
                    + ChineseDate.month.string + ' '
                    + ChineseDate.date.string + ' '
                    + ChineseDate.solarTerm.string + ' '
                    + ChineseDate.holiday.string,
            pinyin: ChineseDate.year.pinyin + ' '
                    + ChineseDate.zodiac.pinyin + ' '
                    + ChineseDate.month.pinyin + ' '
                    + ChineseDate.date.pinyin + ' '
                    + ChineseDate.solarTerm.pinyin + ' '
                    + ChineseDate.holiday.pinyin,
            english: ChineseDate.year.english + ' / '
                    + ChineseDate.zodiac.english + ' / '
                    + ChineseDate.month.english + ' / '
                    + ChineseDate.date.english + ' / '
                    + ChineseDate.solarTerm.english + ' / '
                    + ChineseDate.holiday.english
        };

        WP.chineseDate.date = ChineseDate;
    },

    write: function () {
        var cd = WP.chineseDate.date;
        document.getElementById('date').innerHTML = cd.full.string;
    },

    init: function () {
        WP.chineseDate.make(new Date());
        WP.chineseDate.write();
    }
};


WP.cosmetics = {
    init: function () {

        $(function () {
            var topPrev = $('#top-prev');
            var topNext = $('#top-next');
            var left = $('.side-nav-left');
            var right = $('.side-nav-right');
            var leftDiv = $('.side-nav-left div');
            var rightDiv = $('.side-nav-right div');

            // Change property of cssElement to value when hovering
            // over hoverElement
            function linkHoverStates(hoverElement, cssElement, property, value) {
                hoverElement.mouseenter(function () {
                    cssElement.css(property, value);
                });

                hoverElement.mouseleave(function () {
                    cssElement.css(property, '');
                });
            }

            linkHoverStates(topPrev, leftDiv, 'border-right', '1px solid #07f');
            linkHoverStates(topPrev, leftDiv, 'background', 'white');

            linkHoverStates(topNext, rightDiv, 'border-left', '1px solid #07f');
            linkHoverStates(topNext, rightDiv, 'background', 'white');

            linkHoverStates(left, topPrev, 'color', '#07f');
            linkHoverStates(right, topNext, 'color', '#07f');

            var sideNavSpan = $('.side-nav span');

            if (sideNavSpan.is(':visible')) {
                sideNavSpan.hide().delay(500).fadeIn(1000);
            }

            $(window).resize(function() {
                if ($(window).width() < 1024) {
                    sideNavSpan.css('display', 'none');
                } else if (!sideNavSpan.is(':visible')) {
                    sideNavSpan.fadeIn(1000);
                }
            });

            $('img.lazy').lazyload({
                effect: 'fadeIn'
            });
        });
    }
};

WP.cosmetics.init();
WP.chineseDate.init();
