import { useState, useMemo, useEffect, useRef } from "react";

// ── DATA ───────────────────────────────────────────────────────────────────────
const INIT_RESELLERS = [
  { name:"A.C.S.S", nameHe:"איי.סי.אס.אס", id:"038002", discount:15, address:"שארית הפליטה 34, חיפה", phone:"", email:"", contacts:[] },
  { name:"A.I. Umbrella It Ltd.", nameHe:"א.ל. אמברלה אי-טי", id:"064961", discount:12.5, address:"יגיע כפיים 2, ת\"א", phone:"", email:"", contacts:[] },
  { name:"A.R.Win Technologies Ltd", nameHe:"א.ר.ווין טכנולוגיות", id:"082368", discount:12.5, address:"בעל שם טוב 38, פ\"ת", phone:"", email:"", contacts:[] },
  { name:"Access Technologies Ltd", nameHe:"", id:"010322", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"All.i.t Ltd.", nameHe:"אול.איי.טי", id:"074304", discount:12.5, address:"היצירה 371, משען", phone:"", email:"", contacts:[] },
  { name:"Altec Business Computing Ltd", nameHe:"אלטק מחשוב לעסקים", id:"081323", discount:13.5, address:"ת.ד. 337, אשקלון", phone:"", email:"", contacts:[] },
  { name:"Atlantic Ltd", nameHe:"אטלנטיק מחשבים", id:"010851", discount:12.5, address:"כיכר וייצמן 15, חולון", phone:"", email:"", contacts:[] },
  { name:"Azuz IT Solutions", nameHe:"", id:"081738", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"backmen computers", nameHe:"בקמן מחשבים", id:"080985", discount:12.5, address:"רמת הכובש", phone:"", email:"", contacts:[] },
  { name:"Bar Digital", nameHe:"", id:"082219", discount:14.5, address:"", phone:"", email:"", contacts:[] },
  { name:"Ben Binyamin Technologies Ltd", nameHe:"בן בנימין טכנולוגיות", id:"015685", discount:12.5, address:"לח'י 25, בני ברק", phone:"", email:"", contacts:[] },
  { name:"BGPC", nameHe:"", id:"082479", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"Browarnik LTD", nameHe:"אקספרטוס ברוורניק", id:"080227", discount:13, address:"בית לחם 54, ירושלים", phone:"", email:"", contacts:[] },
  { name:"Cambrinx Group Ltd", nameHe:"קבוצת קיימבריקס", id:"042054", discount:14, address:"רבקה 19, ירושלים", phone:"", email:"", contacts:[] },
  { name:"Com Media$", nameHe:"קום מדיה", id:"080413", discount:12.5, address:"הותיקים 14, אבן יהודה", phone:"", email:"", contacts:[] },
  { name:"Com-Net supporting Ltd", nameHe:"קום-נט תמיכה", id:"014100", discount:14, address:"דוד סחרוב 17, ראשון לציון", phone:"", email:"", contacts:[] },
  { name:"CPU Computers LTD", nameHe:"", id:"083246", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"CTS engineering", nameHe:"", id:"082427", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"Daat Computers", nameHe:"דעת מחשבים", id:"030272", discount:12.5, address:"הנביאים 68, ירושלים", phone:"", email:"", contacts:[] },
  { name:"Danet Ltd", nameHe:"ד.נ.ת. מחשוב", id:"024343", discount:15, address:"החרושת 19, רעננה", phone:"", email:"", contacts:[] },
  { name:"ddcom group ltd", nameHe:"קבוצת דידיקום", id:"083044", discount:12.5, address:"ישראל זנגוויל 22, ירושלים", phone:"", email:"", contacts:[] },
  { name:"Dgm Communication Ltd", nameHe:"דגם תקשורת", id:"010613", discount:12.5, address:"הדשנים 13, חיפה", phone:"", email:"", contacts:[] },
  { name:"Dortech Nihul Marachot", nameHe:"דורטק ניהול מערכות", id:"054024", discount:12.5, address:"ז'בוטינסקי 7, רמת גן", phone:"", email:"", contacts:[] },
  { name:"E.L.K Comprehensive IT Solutions Ltd", nameHe:"אי.אל.קיי.", id:"029441", discount:12.5, address:"מדינת היהודים 62, הרצליה", phone:"", email:"", contacts:[] },
  { name:"EDA PC", nameHe:"אי די אי פי סי", id:"082733", discount:13, address:"שביט 13, באר יעקב", phone:"", email:"", contacts:[] },
  { name:"Edi Solutions", nameHe:"אדי פתרונות", id:"028221", discount:12.5, address:"גינצבורג 6, ראשון לציון", phone:"", email:"", contacts:[] },
  { name:"Egoz Systems", nameHe:"אגוז מערכות", id:"046936", discount:12.5, address:"איילת השחר", phone:"", email:"", contacts:[] },
  { name:"EICom Computers", nameHe:"אלקום מחשבים", id:"010631", discount:12.5, address:"נחל הבשור 70, טל שחר", phone:"", email:"", contacts:[] },
  { name:"EXCELLENT I.T Ltd", nameHe:"אקסלנט איי.טי.", id:"073342", discount:14, address:"החורטים 8, חולון", phone:"", email:"", contacts:[] },
  { name:"Expim Ltd", nameHe:"אקספים", id:"030608", discount:14, address:"מעבר יבוק 5, ת\"א", phone:"", email:"", contacts:[] },
  { name:"F1 Computing Solutions Ltd", nameHe:"אפ-1 פתרונות מחשוב", id:"080021", discount:12.5, address:"הכשרת היישוב 23, ראשון לציון", phone:"", email:"", contacts:[] },
  { name:"Gal Amar Computers LTD", nameHe:"גל עמר מחשבים", id:"083142", discount:12.5, address:"בנימין מטודלה 30, ירושלים", phone:"", email:"", contacts:[] },
  { name:"GiBS Computers Ltd", nameHe:"גיבס מחשבים", id:"072883", discount:12.5, address:"הררי 7, רמת גן", phone:"", email:"", contacts:[] },
  { name:"Gotec Smart Communication", nameHe:"", id:"025460", discount:15, address:"", phone:"", email:"", contacts:[] },
  { name:"Guy Shivuk", nameHe:"גיא שיווק", id:"028827", discount:14, address:"איכילוב 13, פ\"ת", phone:"", email:"", contacts:[] },
  { name:"Head Computer Systems Ltd", nameHe:"ראש מערכות מחשב", id:"029891", discount:12.5, address:"כלנית 73, מבשרת ציון", phone:"", email:"", contacts:[] },
  { name:"High-Net Ltd", nameHe:"היי-נט", id:"028723", discount:13.5, address:"ת.ד. 550, קרית ים", phone:"", email:"", contacts:[] },
  { name:"Hilkaltex sh.y.(1988) Ltd", nameHe:"הילקלטקס ש.י", id:"082841", discount:14, address:"דרך מנחם בגין 154, ת\"א", phone:"", email:"", contacts:[] },
  { name:"HIT Computing Solutions", nameHe:"", id:"082308", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"I support", nameHe:"", id:"080252", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"I.S.O", nameHe:"ש.י.א ייזום ופיתוח", id:"080206", discount:13.5, address:"השיזף 15, נתניה", phone:"", email:"", contacts:[] },
  { name:"IT 4 You Ltd", nameHe:"אי.טי.4.יו", id:"073461", discount:15, address:"לח'י 28, בני ברק", phone:"", email:"", contacts:[] },
  { name:"ITeam SH LTD", nameHe:"אייתים אס אייץ", id:"081011", discount:12.5, address:"התעשיה 5, רמלה", phone:"", email:"", contacts:[] },
  { name:"ITMS Computing & Data security LTD", nameHe:"", id:"082470", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"JSR Electronic Services Ltd", nameHe:"גשר שירותי אלקטרוניקה", id:"013258", discount:12.5, address:"ת.ד 765, יבנה", phone:"", email:"", contacts:[] },
  { name:"katom IT LTD", nameHe:"כתום מיחשוב", id:"082474", discount:15, address:"דרך הדרום 9, קרית גת", phone:"", email:"", contacts:[] },
  { name:"Kedem Dor Computers Ltd", nameHe:"קדם דור מחשבים", id:"012481", discount:15, address:"בונה אליעזר 9, חיפה", phone:"", email:"", contacts:[] },
  { name:"Litos Computers Ltd", nameHe:"ליטוס מחשבים", id:"020035", discount:12.5, address:"תובל 22, רמת גן", phone:"", email:"", contacts:[] },
  { name:"Lumyns Information Systems Ltd", nameHe:"לומינס מערכות מידע", id:"056089", discount:12.5, address:"תכלת 3, תרדיון", phone:"", email:"", contacts:[] },
  { name:"M.D.S. Eliran Computers Ltd", nameHe:"אמ.די.אס אלירן", id:"010062", discount:12.5, address:"דרך השלום 9, נשר", phone:"", email:"", contacts:[] },
  { name:"Medatech Systems Ltd", nameHe:"מידעטק מערכות", id:"035349", discount:15, address:"הסדנא 3, טירת כרמל", phone:"", email:"", contacts:[] },
  { name:"MegaBite", nameHe:"מגהבייט", id:"080164", discount:14.5, address:"אפשטיין 6, ת\"א", phone:"", email:"", contacts:[] },
  { name:"Meir Rafaelo - Sivim computers", nameHe:"", id:"082252", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"MIRAGE IT ADVANCED TECHNOLOGIES LTD", nameHe:"", id:"082536", discount:14.5, address:"", phone:"", email:"", contacts:[] },
  { name:"MYTNET TECHNOLOGIES", nameHe:"מייטינט טכנולוגיות", id:"080970", discount:12.5, address:"ת.ד.570, רעננה", phone:"", email:"", contacts:[] },
  { name:"Natan-Or.Computers and Networks", nameHe:"נתן-אור", id:"081776", discount:14, address:"אבי דוד 11, גני מודיעין", phone:"", email:"", contacts:[] },
  { name:"NetCare Ltd", nameHe:"", id:"016471", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"Netprofessional Technologies", nameHe:"נטפרופשיונל טכנולוגיות", id:"076096", discount:12.5, address:"ההדס 18, תל מונד", phone:"", email:"", contacts:[] },
  { name:"Oriental Computers System Ltd", nameHe:"אוריינטל מערכות מיחשוב", id:"010849", discount:12.5, address:"המפעל 10, אור יהודה", phone:"", email:"", contacts:[] },
  { name:"Pelican Tech Ltd", nameHe:"", id:"082006", discount:15, address:"", phone:"", email:"", contacts:[] },
  { name:"Point Computers Ltd", nameHe:"", id:"017772", discount:13.5, address:"", phone:"", email:"", contacts:[] },
  { name:"PR IT INOVIT LTD", nameHe:"", id:"083210", discount:15, address:"", phone:"", email:"", contacts:[] },
  { name:"rd tech computers Ltd", nameHe:"", id:"081122", discount:15, address:"", phone:"", email:"", contacts:[] },
  { name:"REUTONE A.Y LTD", nameHe:"", id:"081729", discount:15, address:"", phone:"", email:"", contacts:[] },
  { name:"ROS SOLUTIONS LTD", nameHe:"אר.או.אס סולושיינס", id:"082269", discount:12.5, address:"כפר סבא", phone:"", email:"", contacts:[] },
  { name:"S.C. Car Netsolutions", nameHe:"אס. סי. קאר נטסולושנס", id:"062558", discount:14, address:"עתיר ידע 5, כפר סבא", phone:"", email:"", contacts:[] },
  { name:"S.A.I INFORMATION TECHNOLOGY LTD", nameHe:"ס.א.ל טכנולוגיות מידע", id:"081539", discount:12.5, address:"השיקמים 3, אור עקיבא", phone:"", email:"", contacts:[] },
  { name:"Saycom", nameHe:"סייקום", id:"081068", discount:12.5, address:"פ\"ת", phone:"", email:"", contacts:[] },
  { name:"Seetech Solutions Ltd", nameHe:"סיטק פתרונות", id:"062287", discount:12.5, address:"רמת גן", phone:"", email:"", contacts:[] },
  { name:"Shiran Communication Ltd", nameHe:"שירן תקשורת", id:"054759", discount:12.5, address:"רחבעם זאבי 2, גבעת שמואל", phone:"", email:"", contacts:[] },
  { name:"Simplicity Solutions Ltd", nameHe:"סימפליסיטי סולושנס", id:"024987", discount:12.5, address:"גיבורי ישראל 20, נתניה", phone:"", email:"", contacts:[] },
  { name:"Softsale Ltd", nameHe:"", id:"031918", discount:14.5, address:"", phone:"", email:"", contacts:[] },
  { name:"Spider Solutions Ltd", nameHe:"ספיידר פתרונות", id:"027140", discount:15, address:"המלאכה 10, ראש העין", phone:"", email:"", contacts:[] },
  { name:"SYNERGY IT SYSTEMS LTD", nameHe:"סינרגיה מערכות מחשוב", id:"081715", discount:12.5, address:"ת\"א", phone:"", email:"", contacts:[] },
  { name:"Sysmate Ltd", nameHe:"סיסמייט", id:"080611", discount:12.5, address:"נשר", phone:"", email:"", contacts:[] },
  { name:"Take Care Data", nameHe:"טייק קר דאטא", id:"066737", discount:14, address:"ההגנה 13, ראשון לציון", phone:"", email:"", contacts:[] },
  { name:"Take Off Technologies Ltd", nameHe:"טייק אוף טכנולוגיות", id:"021513", discount:12.5, address:"מוריה 5, רמת השרון", phone:"", email:"", contacts:[] },
  { name:"Tamir Shen", nameHe:"תמיר שן", id:"015393", discount:12.5, address:"חטיבת גולני 46, רעננה", phone:"", email:"", contacts:[] },
  { name:"TECH-SELECT COMPUTER SERVICES LTD", nameHe:"טק-סלקט", id:"081963", discount:12.5, address:"ת\"א", phone:"", email:"", contacts:[] },
  { name:"Trio Cloud Technologies Ltd", nameHe:"טריו טכנולוגיות ענן", id:"080698", discount:14, address:"הרוקמים 25, חולון", phone:"", email:"", contacts:[] },
  { name:"Y.H.M TECHNOLOGIES LTD", nameHe:"י.ח.מ. טכנולוגיות", id:"081765", discount:15, address:"מנחם בגין 132, ת\"א", phone:"", email:"", contacts:[] },
  { name:"YBD SYSTEM LTD", nameHe:"", id:"083194", discount:12.5, address:"", phone:"", email:"", contacts:[] },
  { name:"Y-Tech Solutions Ltd", nameHe:"וואי-טק פתרונות", id:"060208", discount:14.5, address:"עמל 13, ראש העין", phone:"", email:"", contacts:[] },
];

const CLOUD_CORP = [
  { sku:"CFQ7TTC0LH18:0001", desc:"Microsoft 365 Business Basic", annualE:72, monthlyE:6.30, mthlyE:7.20 },
  { sku:"CFQ7TTC0LH18:000P", desc:"Microsoft 365 Business Basic (no Teams)", annualE:52.80, monthlyE:4.62, mthlyE:5.28 },
  { sku:"CFQ7TTC0LDPB:0001", desc:"Microsoft 365 Business Standard", annualE:150, monthlyE:13.13, mthlyE:15 },
  { sku:"CFQ7TTC0LDPB:0011", desc:"Microsoft 365 Business Standard (no Teams)", annualE:111.48, monthlyE:9.75, mthlyE:11.15 },
  { sku:"CFQ7TTC0LCHC:0002", desc:"Microsoft 365 Business Premium", annualE:264, monthlyE:23.10, mthlyE:26.40 },
  { sku:"CFQ7TTC0LCHC:000N", desc:"Microsoft 365 Business Premium (no Teams)", annualE:225.48, monthlyE:19.73, mthlyE:22.55 },
  { sku:"CFQ7TTC0LH1G:0001", desc:"Microsoft 365 Apps for business", annualE:99.60, monthlyE:8.72, mthlyE:9.96 },
  { sku:"CFQ7TTC0LGZT:0001", desc:"Microsoft 365 Apps for enterprise", annualE:144, monthlyE:12.60, mthlyE:14.40 },
  { sku:"CFQ7TTC0LFLX:0001", desc:"Microsoft 365 E3", annualE:432, monthlyE:37.80, mthlyE:43.20 },
  { sku:"CFQ7TTC0LFLX:0021", desc:"Microsoft 365 E3 (no Teams)", annualE:329.40, monthlyE:28.82, mthlyE:32.94 },
  { sku:"CFQ7TTC0LFLZ:0002", desc:"Microsoft 365 E5", annualE:684, monthlyE:59.85, mthlyE:68.40 },
  { sku:"CFQ7TTC0MM8R:0002", desc:"Microsoft 365 Copilot", annualE:360, monthlyE:31.50, mthlyE:null },
  { sku:"CFQ7TTC0MM8R:001P", desc:"Microsoft 365 Copilot Business", annualE:252, monthlyE:22.05, mthlyE:25.20 },
  { sku:"CFQ7TTC0LF8Q:0001", desc:"Office 365 E1", annualE:120, monthlyE:10.50, mthlyE:12 },
  { sku:"CFQ7TTC0LF8R:0001", desc:"Office 365 E3", annualE:276, monthlyE:24.15, mthlyE:27.60 },
  { sku:"CFQ7TTC0LF8S:0002", desc:"Office 365 E5", annualE:456, monthlyE:39.90, mthlyE:45.60 },
  { sku:"CFQ7TTC0LGZW:0001", desc:"Office 365 F3", annualE:48, monthlyE:4.20, mthlyE:4.80 },
  { sku:"CFQ7TTC0MBMD:0002", desc:"Microsoft 365 F1", annualE:27.60, monthlyE:2.42, mthlyE:2.76 },
  { sku:"CFQ7TTC0LH05:0001", desc:"Microsoft 365 F3", annualE:96, monthlyE:8.40, mthlyE:9.60 },
  { sku:"CFQ7TTC0LH16:0001", desc:"Exchange Online Plan 1", annualE:48, monthlyE:4.20, mthlyE:4.80 },
  { sku:"CFQ7TTC0LH1P:0001", desc:"Exchange Online Plan 2", annualE:96, monthlyE:8.40, mthlyE:9.60 },
  { sku:"CFQ7TTC0LH0T:0001", desc:"Microsoft Teams Phone Standard", annualE:120, monthlyE:10.50, mthlyE:12 },
  { sku:"CFQ7TTC0RM8K:0002", desc:"Microsoft Teams Premium", annualE:120, monthlyE:10.50, mthlyE:12 },
  { sku:"CFQ7TTC0LHSF:0001", desc:"Power BI Pro", annualE:168, monthlyE:14.70, mthlyE:16.80 },
  { sku:"CFQ7TTC0HL8W:0001", desc:"Power BI Premium Per User", annualE:288, monthlyE:25.20, mthlyE:28.80 },
  { sku:"CFQ7TTC0LCH4:0009", desc:"Microsoft Intune Plan 1", annualE:96, monthlyE:8.40, mthlyE:9.60 },
  { sku:"CFQ7TTC0LFLS:0002", desc:"Microsoft Entra ID P1", annualE:72, monthlyE:6.30, mthlyE:7.20 },
  { sku:"CFQ7TTC0LFK5:0001", desc:"Microsoft Entra ID P2", annualE:108, monthlyE:9.45, mthlyE:10.80 },
  { sku:"CFQ7TTC0LHT4:0001", desc:"Enterprise Mobility + Security E3", annualE:127.20, monthlyE:11.13, mthlyE:12.72 },
  { sku:"CFQ7TTC0LFJ1:0001", desc:"Enterprise Mobility + Security E5", annualE:196.80, monthlyE:17.22, mthlyE:19.68 },
  { sku:"CFQ7TTC0HX56:0002", desc:"Microsoft Defender for Business", annualE:36, monthlyE:3.15, mthlyE:3.60 },
  { sku:"CFQ7TTC0LGV0:0001", desc:"Microsoft Defender for Endpoint P2", annualE:62.40, monthlyE:5.46, mthlyE:6.24 },
  { sku:"CFQ7TTC0LHQB:0001", desc:"Microsoft Defender Suite", annualE:144, monthlyE:12.60, mthlyE:14.40 },
  { sku:"CFQ7TTC0HD33:0003", desc:"Visio Plan 1", annualE:60, monthlyE:5.25, mthlyE:6 },
  { sku:"CFQ7TTC0HD32:0002", desc:"Visio Plan 2", annualE:180, monthlyE:15.75, mthlyE:18 },
  { sku:"CFQ7TTC0HDB0:0002", desc:"Planner and Project Plan 3", annualE:360, monthlyE:31.50, mthlyE:36 },
  { sku:"CFQ7TTC0HD9Z:0002", desc:"Planner and Project Plan 5", annualE:660, monthlyE:57.75, mthlyE:66 },
  { sku:"CFQ7TTC0LGTX:0004", desc:"Windows 10/11 Enterprise E3", annualE:84, monthlyE:7.35, mthlyE:8.40 },
  { sku:"CFQ7TTC0LFNW:0002", desc:"Windows 10/11 Enterprise E5", annualE:132, monthlyE:11.55, mthlyE:13.20 },
  { sku:"CFQ7TTC0JN4R:0002", desc:"Microsoft Teams Essentials", annualE:48, monthlyE:4.20, mthlyE:4.80 },
  { sku:"CFQ7TTC0QW7C:0001", desc:"Microsoft Teams Rooms Pro", annualE:480, monthlyE:42, mthlyE:48 },
  { sku:"CFQ7TTC0LHSV:0001", desc:"OneDrive for Business Plan 1", annualE:60, monthlyE:5.25, mthlyE:6 },
  { sku:"CFQ7TTC0LH1M:0001", desc:"OneDrive for Business Plan 2", annualE:120, monthlyE:10.50, mthlyE:12 },
  { sku:"CFQ7TTC0LH0N:0001", desc:"SharePoint Plan 1", annualE:60, monthlyE:5.25, mthlyE:6 },
  { sku:"CFQ7TTC0LH14:0001", desc:"SharePoint Plan 2", annualE:120, monthlyE:10.50, mthlyE:12 },
];

const CLOUD_EDU = [
  { sku:"CFQ7TTC0LHPL:000W", desc:"Microsoft 365 A3 Faculty", annualE:69.60, monthlyE:6.09, mthlyE:6.96 },
  { sku:"CFQ7TTC0LHPL:000X", desc:"Microsoft 365 A3 Student", annualE:51.60, monthlyE:4.52, mthlyE:5.16 },
  { sku:"CFQ7TTC0LHPJ:0015", desc:"Microsoft 365 A5 Faculty", annualE:129.60, monthlyE:11.34, mthlyE:12.96 },
  { sku:"CFQ7TTC0LHPJ:0013", desc:"Microsoft 365 A5 Student", annualE:96, monthlyE:8.40, mthlyE:9.60 },
  { sku:"CFQ7TTC0LHPK:000W", desc:"Office 365 A1 Faculty", annualE:0, monthlyE:0, mthlyE:0 },
  { sku:"CFQ7TTC0LHPK:000V", desc:"Office 365 A1 Student", annualE:0, monthlyE:0, mthlyE:0 },
  { sku:"CFQ7TTC0LHPP:000H", desc:"Office 365 A3 Faculty", annualE:39.60, monthlyE:3.47, mthlyE:3.96 },
  { sku:"CFQ7TTC0LHPP:000K", desc:"Office 365 A3 Student", annualE:30, monthlyE:2.63, mthlyE:3 },
  { sku:"CFQ7TTC0LHPM:0019", desc:"Office 365 A5 Faculty", annualE:96, monthlyE:8.40, mthlyE:9.60 },
  { sku:"CFQ7TTC0LHPM:001G", desc:"Office 365 A5 Student", annualE:72, monthlyE:6.30, mthlyE:7.20 },
  { sku:"CFQ7TTC0LGZT:001D", desc:"Microsoft 365 Apps Faculty", annualE:27.60, monthlyE:2.42, mthlyE:2.76 },
  { sku:"CFQ7TTC0LGZT:001F", desc:"Microsoft 365 Apps Student", annualE:21, monthlyE:1.84, mthlyE:2.10 },
  { sku:"CFQ7TTC0MM8R:000K", desc:"Copilot for M365 A3/A5 Faculty", annualE:216, monthlyE:18.90, mthlyE:null },
  { sku:"CFQ7TTC0LHSF:0011", desc:"Power BI Pro Faculty", annualE:27.60, monthlyE:2.42, mthlyE:2.76 },
  { sku:"CFQ7TTC0LHSF:0013", desc:"Power BI Pro Student", annualE:15, monthlyE:1.31, mthlyE:1.50 },
  { sku:"CFQ7TTC0LSNL:0005", desc:"Intune for Education Faculty", annualE:9, monthlyE:0.79, mthlyE:0.90 },
  { sku:"CFQ7TTC0LSNL:0004", desc:"Intune for Education Student", annualE:9, monthlyE:0.79, mthlyE:0.90 },
  { sku:"CFQ7TTC0LFLS:0014", desc:"Microsoft Entra ID P1 Faculty", annualE:7.20, monthlyE:0.63, mthlyE:0.72 },
  { sku:"CFQ7TTC0LFLS:001B", desc:"Microsoft Entra ID P1 Student", annualE:3.60, monthlyE:0.32, mthlyE:0.36 },
  { sku:"CFQ7TTC0LFK5:001J", desc:"Microsoft Entra ID P2 Faculty", annualE:10.80, monthlyE:0.95, mthlyE:1.08 },
  { sku:"CFQ7TTC0LFK5:0019", desc:"Microsoft Entra ID P2 Student", annualE:5.40, monthlyE:0.47, mthlyE:0.54 },
  { sku:"CFQ7TTC0HD33:0014", desc:"Visio Plan 1 Faculty", annualE:12, monthlyE:1.05, mthlyE:1.20 },
  { sku:"CFQ7TTC0HD32:0012", desc:"Visio Plan 2 Faculty", annualE:26.40, monthlyE:2.31, mthlyE:2.64 },
  { sku:"CFQ7TTC0RM8K:000M", desc:"Teams Premium Faculty", annualE:24, monthlyE:2.10, mthlyE:2.40 },
  { sku:"CFQ7TTC0RM8K:000P", desc:"Teams Premium Student", annualE:18, monthlyE:1.58, mthlyE:1.80 },
];

const PERP_CORP = [
  { sku:"DG7GMGF0PWHC:0003-C", group:"Windows Server", desc:"Windows Server 2025 Standard - 16 Core", partnerPrice:1073.68 },
  { sku:"DG7GMGF0PWHC:0006-C", group:"Windows Server", desc:"Windows Server 2025 Standard - 2 Core", partnerPrice:134.21 },
  { sku:"DG7GMGF0PWHD:0001-C", group:"Windows Server", desc:"Windows Server 2025 Datacenter - 16 Core", partnerPrice:6180.99 },
  { sku:"DG7GMGF0PWHD:0004-C", group:"Windows Server", desc:"Windows Server 2025 Datacenter - 2 Core", partnerPrice:772.40 },
  { sku:"DG7GMGF0PWHT:0002-C", group:"Windows Server", desc:"Windows Server 2025 - 1 User CAL", partnerPrice:45.65 },
  { sku:"DG7GMGF0PWHT:0005-C", group:"Windows Server", desc:"Windows Server 2025 - 1 Device CAL", partnerPrice:35.61 },
  { sku:"DG7GMGF0PWHB:0004-C", group:"Windows Server", desc:"Windows Server 2025 RDS - 1 User CAL", partnerPrice:158.86 },
  { sku:"DG7GMGF0D8H4:0004-C", group:"Windows 10/11", desc:"Windows 11 Pro Upgrade", partnerPrice:170.73 },
  { sku:"DG7GMGF0PP46:0002-C", group:"Windows 10/11", desc:"Windows 11 Enterprise LTSC 2024 Upgrade", partnerPrice:269.33 },
  { sku:"DG7GMGF0SSGZ:0004-C", group:"Win10 ESU", desc:"Windows 10 ESU Year 1 (2025-2026)", partnerPrice:55.69 },
  { sku:"DG7GMGF0SSGZ:0001-C", group:"Win10 ESU", desc:"Windows 10 ESU Year 2 (2026-2027)", partnerPrice:111.39 },
  { sku:"DG7GMGF0SSGZ:0002-C", group:"Win10 ESU", desc:"Windows 10 ESU Year 3 (2027-2028)", partnerPrice:222.77 },
  { sku:"DG7GMGF0VJ96:0002-C", group:"Visual Studio", desc:"Visual Studio Professional 2026", partnerPrice:455.59 },
  { sku:"DG7GMGF0VNJS:0002-C", group:"SQL Server", desc:"SQL Server 2025 Standard - 1 Server", partnerPrice:901.13 },
  { sku:"DG7GMGF0VNH2:0002-C", group:"SQL Server", desc:"SQL Server 2025 Standard Core - 2 Core", partnerPrice:3600.86 },
  { sku:"DG7GMGF0VNGX:0006-C", group:"SQL Server", desc:"SQL Server 2025 Enterprise Core - 2 Core", partnerPrice:13806.34 },
  { sku:"DG7GMGF0VNHV:0002-C", group:"SQL Server", desc:"SQL Server 2025 - 1 User CAL", partnerPrice:209.08 },
  { sku:"DG7GMGF0PN5D:0002-C", group:"Office LTSC", desc:"Office LTSC Standard 2024", partnerPrice:451.93 },
  { sku:"DG7GMGF0PN5F:0002-C", group:"Office LTSC", desc:"Office LTSC Professional Plus 2024", partnerPrice:616.27 },
  { sku:"DG7GMGF0PN5C:0001-C", group:"Office LTSC", desc:"Office LTSC Standard for Mac 2024", partnerPrice:451.93 },
  { sku:"DG7GMGF0PN41:0002-C", group:"Office LTSC", desc:"Word LTSC 2024", partnerPrice:173.47 },
  { sku:"DG7GMGF0PN47:0001-C", group:"Office LTSC", desc:"PowerPoint LTSC 2024", partnerPrice:173.47 },
  { sku:"DG7GMGF0PN5H:0002-C", group:"Office LTSC", desc:"Excel LTSC 2024", partnerPrice:173.47 },
  { sku:"DG7GMGF0PN5V:0001-C", group:"Office LTSC", desc:"Outlook LTSC 2024", partnerPrice:173.47 },
  { sku:"DG7GMGF0PN5J:0002-C", group:"Office LTSC", desc:"Access LTSC 2024", partnerPrice:173.47 },
  { sku:"DG7GMGF0PN43:0002-C", group:"Visio LTSC", desc:"Visio LTSC Professional 2024", partnerPrice:529.54 },
  { sku:"DG7GMGF0PN42:0002-C", group:"Visio LTSC", desc:"Visio LTSC Standard 2024", partnerPrice:283.03 },
  { sku:"DG7GMGF0PN45:0001-C", group:"Project LTSC", desc:"Project Professional 2024", partnerPrice:1031.69 },
  { sku:"DG7GMGF0PN44:0001-C", group:"Project LTSC", desc:"Project Standard 2024", partnerPrice:620.84 },
  { sku:"DG7GMGF0F4MC:0003-C", group:"Exchange Server", desc:"Exchange Server Standard 2019", partnerPrice:712.14 },
  { sku:"DG7GMGF0F4MB:0004-C", group:"Exchange Server", desc:"Exchange Server Standard 2019 User CAL", partnerPrice:88.56 },
  { sku:"DG7GMGF0F4MF:0003-C", group:"Exchange Server", desc:"Exchange Server Enterprise 2019", partnerPrice:4068.31 },
  { sku:"DG7GMGF0F4LT:0002-C", group:"SharePoint Server", desc:"SharePoint Server 2019", partnerPrice:6827.39 },
  { sku:"DG7GMGF0F4LS:0002-C", group:"SharePoint Server", desc:"SharePoint Standard 2019 User CAL", partnerPrice:123.25 },
  { sku:"DG7GMGF0F4LQ:0002-C", group:"Skype Server", desc:"Skype for Business Server 2019", partnerPrice:3662.03 },
  { sku:"DG7GMGF0F4MH:0003-C", group:"Project Server", desc:"Project Server 2019", partnerPrice:5689.80 },
  { sku:"DG7GMGF0G49W:0002-C", group:"BizTalk Server", desc:"BizTalk Server 2020 Standard", partnerPrice:4628.89 },
  { sku:"DG7GMGF0G49X:0001-C", group:"BizTalk Server", desc:"BizTalk Server 2020 Enterprise", partnerPrice:20190.01 },
];

const PERP_EDU = [
  { sku:"DG7GMGF0PWHC:0003-E", group:"Windows Server", desc:"Windows Server 2025 Standard - 16 Core", partnerPrice:268.42 },
  { sku:"DG7GMGF0PWHC:0006-E", group:"Windows Server", desc:"Windows Server 2025 Standard - 2 Core", partnerPrice:32.87 },
  { sku:"DG7GMGF0PWHD:0001-E", group:"Windows Server", desc:"Windows Server 2025 Datacenter - 16 Core", partnerPrice:1544.79 },
  { sku:"DG7GMGF0PWHD:0004-E", group:"Windows Server", desc:"Windows Server 2025 Datacenter - 2 Core", partnerPrice:192.64 },
  { sku:"DG7GMGF0PWHT:0002-E", group:"Windows Server", desc:"Windows Server 2025 - 1 User CAL", partnerPrice:10.96 },
  { sku:"DG7GMGF0D8H4:0004-E", group:"Windows 10/11", desc:"Windows 11 Pro Upgrade", partnerPrice:59.34 },
  { sku:"DG7GMGF0SSGZ:0003-E", group:"Win10 ESU", desc:"Windows 10 ESU Year 1 (2025-2026)", partnerPrice:0.91 },
  { sku:"DG7GMGF0SSGZ:0005-E", group:"Win10 ESU", desc:"Windows 10 ESU Year 2 (2026-2027)", partnerPrice:1.83 },
  { sku:"DG7GMGF0SSGZ:0006-E", group:"Win10 ESU", desc:"Windows 10 ESU Year 3 (2027-2028)", partnerPrice:3.65 },
  { sku:"DG7GMGF0VJ96:0002-E", group:"Visual Studio", desc:"Visual Studio Professional 2026", partnerPrice:67.56 },
  { sku:"DG7GMGF0VNJS:0002-E", group:"SQL Server", desc:"SQL Server 2025 Standard - 1 Server", partnerPrice:224.60 },
  { sku:"DG7GMGF0VNH2:0002-E", group:"SQL Server", desc:"SQL Server 2025 Standard Core - 2 Core", partnerPrice:900.21 },
  { sku:"DG7GMGF0VNGX:0006-E", group:"SQL Server", desc:"SQL Server 2025 Enterprise Core - 2 Core", partnerPrice:3451.13 },
  { sku:"DG7GMGF0PN5D:0002-E", group:"Office LTSC", desc:"Office LTSC Standard 2024", partnerPrice:61.17 },
  { sku:"DG7GMGF0PN5F:0002-E", group:"Office LTSC", desc:"Office LTSC Professional Plus 2024", partnerPrice:84 },
  { sku:"DG7GMGF0PN41:0002-E", group:"Office LTSC", desc:"Word LTSC 2024", partnerPrice:23.47 },
  { sku:"DG7GMGF0PN5H:0002-E", group:"Office LTSC", desc:"Excel LTSC 2024", partnerPrice:23.47 },
  { sku:"DG7GMGF0PN5V:0001-E", group:"Office LTSC", desc:"Outlook LTSC 2024", partnerPrice:23.47 },
  { sku:"DG7GMGF0PN43:0002-E", group:"Visio LTSC", desc:"Visio LTSC Professional 2024", partnerPrice:79.43 },
  { sku:"DG7GMGF0PN45:0001-E", group:"Project LTSC", desc:"Project Professional 2024", partnerPrice:154.30 },
  { sku:"DG7GMGF0F4MC:0003-E", group:"Exchange Server", desc:"Exchange Server Standard 2019", partnerPrice:178.03 },
  { sku:"DG7GMGF0F4LT:0002-E", group:"SharePoint Server", desc:"SharePoint Server 2019", partnerPrice:1706.39 },
];

// ── STORAGE ────────────────────────────────────────────────────────────────────
const SK = { res:"ms_res_v5", cons:"ms_cons_v1", prices:"ms_prices_v1" };
const ld = (k,d) => { try { const s=localStorage.getItem(k); return s?JSON.parse(s):d; } catch { return d; } };
const sv = (k,v) => { try { localStorage.setItem(k,JSON.stringify(v)); } catch {} };
const fmt = n => n==null?"—":`$${Number(n).toFixed(2)}`;
const dp = (p,pct) => p*(1-pct/100);

export default function App() {
  const CONTACTS_RAW = [
    { resellerId:"010849", name:"נמרוד קליינמן", role:"טכני", position:"בעלים", email:"NimrodK@Oriental.co.il", phone:"052-3502154" },
    { resellerId:"010849", name:"יהל פינקלשטיין", role:"עסקי", position:"רכש", email:"yahelf@oriental.co.il", phone:"052-5111819" },
    { resellerId:"010849", name:"עופר וינברג", role:"עסקי", position:"בעלים", email:"oferw@oriental.co.il", phone:"052-2781274" },
    { resellerId:"028723", name:"שי זילבר", role:"עסקי", position:"מנכל", email:"shai@high-net.co.il", phone:"054-5214944" },
    { resellerId:"028723", name:"זוהר זילבר", role:"טכני", position:"CTO", email:"Zohar@high-net.co.il", phone:"054-2363676" },
    { resellerId:"028723", name:"איתי קידרון", role:"טכני", position:"טכני", email:"itay@high-net.co.il", phone:"054-2363675" },
    { resellerId:"028723", name:"לינת", role:"עסקי", position:"רכש", email:"office@high-net.co.il", phone:"052-7242075" },
    { resellerId:"030608", name:"לירון חדד", role:"עסקי", position:"בעלים", email:"liron@expim.co.il", phone:"052-5556961" },
    { resellerId:"030608", name:"אופיר חדד", role:"טכני", position:"בעלים", email:"ofir@expim.co.il", phone:"" },
    { resellerId:"030608", name:"סטפני", role:"עסקי", position:"רכש", email:"office@expim.co.il", phone:"052-4670850" },
    { resellerId:"080227", name:"יוסי גרוס", role:"טכני", position:"טכני", email:"yossig@expertos.co.il", phone:"054-4935353" },
    { resellerId:"080227", name:"אבל ברוורניק", role:"עסקי", position:"בעלים", email:"abel@expertos.co.il", phone:"054-2406410" },
    { resellerId:"081011", name:"חזי חלוץ", role:"עסקי", position:"בעלים", email:"hezy@iteam-sh.co.il", phone:"058-6303866" },
    { resellerId:"081011", name:"רונן סומברג", role:"טכני", position:"בעלים", email:"ronen@iteam-sh.co.il", phone:"050-3777520" },
    { resellerId:"082841", name:"דניאל קלנר", role:"טכני", position:"בעלים", email:"daniel@octopuscs.com", phone:"050-4580420" },
    { resellerId:"082841", name:"מיכאל קלנר", role:"עסקי", position:"מכירות", email:"michael@octopuscs.com", phone:"052-3427872" },
    { resellerId:"010851", name:"הרצל", role:"עסקי", position:"בעלים", email:"herzelp@atlantic.co.il", phone:"052-5593030" },
    { resellerId:"056089", name:"אלי חדד", role:"עסקי", position:"בעלים", email:"eli@lumyns.com", phone:"054-2646402" },
    { resellerId:"082368", name:"ריקי", role:"עסקי", position:"מכירות", email:"riki@wintech.co.il", phone:"054-522-1299" },
    { resellerId:"082368", name:"יגאל אברהם", role:"עסקי", position:"מכירות", email:"igal@wintech.co.il", phone:"054-3008636" },
    { resellerId:"073342", name:"טוני", role:"טכני", position:"טכני", email:"toni@excellent.co.il", phone:"03-6885558" },
    { resellerId:"073342", name:"גיל אריאל", role:"עסקי", position:"בעלים", email:"gill@excellnet.co.il", phone:"054-5858218" },
    { resellerId:"054759", name:"גבי", role:"עסקי", position:"בעלים", email:"gabi@shirannet.co.il", phone:"052-6703305" },
    { resellerId:"080970", name:"איתי אלון", role:"עסקי", position:"בעלים", email:"ittai@mytnet.co.il", phone:"072-2722772" },
    { resellerId:"027140", name:"דייגו", role:"עסקי", position:"מנהל מכירות", email:"diego@spiderservices.com", phone:"077-2628020" },
    { resellerId:"027140", name:"רפי קוקוטק", role:"עסקי", position:"בעלים", email:"rafik@spiderservices.com", phone:"050-5593666" },
    { resellerId:"082733", name:"ערן עטר", role:"עסקי", position:"בעלים", email:"eran@edapc.co.il", phone:"054-6339940" },
    { resellerId:"013258", name:"מוטי זאדה", role:"עסקי", position:"בעלים", email:"moti@jsrcomp.co.il", phone:"054-3244244" },
    { resellerId:"054024", name:"אילנית", role:"עסקי", position:"מנהל מכירות", email:"ilanit@dortech.co.il", phone:"054-7581777" },
    { resellerId:"062558", name:"שרון קרסיינטה", role:"עסקי", position:"בעלים", email:"sharonc@sccn.co.il", phone:"054-2473300" },
    { resellerId:"014100", name:"דני טויטו", role:"עסקי", position:"בעלים", email:"dany@komnet.co.il", phone:"054-4992511" },
    { resellerId:"080021", name:"שגיא וואן", role:"עסקי", position:"בעלים", email:"sagi@f1-net.co.il", phone:"050-5446804" },
    { resellerId:"080164", name:"אייל קפלן", role:"עסקי", position:"בעלים", email:"info@mega-bite.co.il", phone:"050-7474474" },
    { resellerId:"080164", name:"רותם", role:"טכני", position:"בעלים", email:"rotem@mega-bite.co.il", phone:"050-7461146" },
    { resellerId:"012481", name:"דודי קדם", role:"עסקי", position:"בעלים", email:"dudi@kdc.co.il", phone:"052-3300800" },
    { resellerId:"010062", name:"עמיר לוי", role:"עסקי", position:"מכירות", email:"amirl@mds.co.il", phone:"054-2446711" },
    { resellerId:"062287", name:"שרון כספי", role:"עסקי", position:"בעלים", email:"sharonk@seetech.co.il", phone:"052-7979214" },
    { resellerId:"062287", name:"אייל חיים", role:"עסקי", position:"בעלים", email:"Eyalh@seetech.co.il", phone:"052-7979216" },
    { resellerId:"076096", name:"ענבל גיל", role:"עסקי", position:"בעלים", email:"inbalg@net-pro.co.il", phone:"054-3555594" },
    { resellerId:"060208", name:"ריטה זאבי", role:"עסקי", position:"רכש", email:"ritaz@y-tech.net", phone:"052-5500566" },
    { resellerId:"060208", name:"אלי כהן", role:"עסקי", position:"מנכל", email:"elic@y-tech.net", phone:"054-4428888" },
    { resellerId:"060208", name:"תומר שוויצר", role:"עסקי", position:"בעלים", email:"tomers@y-tech.net", phone:"054-6697779" },
    { resellerId:"060208", name:"משה הורביץ", role:"טכני", position:"טכני", email:"mosheh@y-tech.net", phone:"" },
    { resellerId:"035349", name:"יוליה", role:"עסקי", position:"מכירות", email:"yulia_k@medatech.com", phone:"052-6443039" },
    { resellerId:"035349", name:"יערה", role:"עסקי", position:"מנכל", email:"yaara@medatech.com", phone:"052-4561116" },
    { resellerId:"081323", name:"אלכס סופר", role:"עסקי", position:"בעלים", email:"alex@altec.co.il", phone:"054-5713715" },
    { resellerId:"081323", name:"יבגני", role:"טכני", position:"בעלים", email:"admin@altec.co.il", phone:"054-8179999" },
    { resellerId:"080698", name:"שלומי", role:"עסקי", position:"בעלים", email:"shlomi@trio-cloud.com", phone:"052-2849859" },
    { resellerId:"080413", name:"ירון בלומברג", role:"עסקי", position:"בעלים", email:"yaron@co-media.co.il", phone:"054-8040714" },
    { resellerId:"080413", name:"אלעד אברהמי", role:"עסקי", position:"בעלים", email:"elad@co-media.co.il", phone:"" },
    { resellerId:"024343", name:"רן ביטרמן", role:"עסקי", position:"מכירות", email:"Sales@danet.co.il", phone:"052-4045399" },
    { resellerId:"024343", name:"אלכס מוטליס", role:"עסקי", position:"בעלים", email:"alex@danet.co.il", phone:"054-4289036" },
    { resellerId:"066737", name:"סאלי", role:"טכני", position:"טכני", email:"sali@tcdata.co.il", phone:"050-4757776" },
    { resellerId:"080985", name:"אייל מנדיל", role:"טכני", position:"טכני", email:"eyal@backmen.co.il", phone:"054-7748455" },
    { resellerId:"080985", name:"שי בקמן", role:"עסקי", position:"בעלים", email:"shay@backmen.co.il", phone:"052-5595145" },
    { resellerId:"015685", name:"יהושע בן בנימין", role:"עסקי", position:"בעלים", email:"josh@bbt.co.il", phone:"052-2452239" },
    { resellerId:"073461", name:"יוסי עמארה", role:"עסקי", position:"", email:"yossi@it4u.org.il", phone:"054-8091343" },
    { resellerId:"073461", name:"דודי יגל", role:"עסקי", position:"בעלים", email:"dudi@it4u.org.il", phone:"054-4281789" },
    { resellerId:"081715", name:"יבגני שיפילבסקי", role:"עסקי", position:"", email:"yivgeny@synergy-it.co.il", phone:"058-7330440" },
    { resellerId:"020035", name:"מוטי זוהר", role:"עסקי", position:"", email:"moti@litos.co.il", phone:"054-3395076" },
    { resellerId:"020035", name:"יעקב שירי", role:"עסקי", position:"בעלים", email:"yakovs@litos.co.il", phone:"054-3088142" },
    { resellerId:"081539", name:"ג'קי שושן", role:"טכני", position:"", email:"jackys@pi-sp.com", phone:"054-2360006" },
    { resellerId:"081539", name:"דניאל אדרי", role:"עסקי", position:"בעלים", email:"danny@sal-it.com", phone:"054-2468220" },
    { resellerId:"015393", name:"תמיר שן", role:"עסקי", position:"בעלים", email:"tamir@schen.co.il", phone:"052-8746508" },
    { resellerId:"080206", name:"אלחחר שמעון", role:"עסקי", position:"בעלים", email:"iso2@bezeqint.net", phone:"052-3611893" },
    { resellerId:"024987", name:"איתן", role:"עסקי", position:"בעלים", email:"eytan@simp.co.il", phone:"050-4090601" },
    { resellerId:"021513", name:"אסף כנען", role:"עסקי", position:"בעלים", email:"assaf@take-off.co.il", phone:"053-7301505" },
    { resellerId:"010631", name:"עמיר אלקיים", role:"עסקי", position:"בעלים", email:"amir@el-com.co.il", phone:"054-6339460" },
    { resellerId:"029441", name:"אולג קובלב", role:"עסקי", position:"רכש", email:"info@elk-group.com", phone:"050-3975054" },
    { resellerId:"081068", name:"שגיא", role:"עסקי", position:"בעלים", email:"sagi@saycom.co.il", phone:"054-7233770" },
    { resellerId:"080611", name:"דורון השג", role:"עסקי", position:"בעלים", email:"doron@sysmate.co.il", phone:"054-7848515" },
    { resellerId:"083044", name:"דויד", role:"עסקי", position:"בעלים", email:"ddcom@012.net.il", phone:"052-2633063" },
    { resellerId:"028221", name:"ירון מן", role:"עסקי", position:"בעלים", email:"yaron.man@dym.co.il", phone:"054-5444455" },
    { resellerId:"081776", name:"נתנאור", role:"עסקי", position:"בעלים", email:"natanor@natanor.co.il", phone:"054-5700950" },
    { resellerId:"074304", name:"אבי אסייג", role:"עסקי", position:"בעלים", email:"avi.a@allit.co.il", phone:"050-4545505" },
    { resellerId:"074304", name:"אורי כמראני", role:"טכני", position:"בעלים", email:"ori.k@allit.co.il", phone:"050-4464461" },
    { resellerId:"029891", name:"רחלי", role:"עסקי", position:"רכש", email:"r@rosh.co.il", phone:"054-3333916" },
    { resellerId:"083142", name:"גל עמר", role:"עסקי", position:"בעלים", email:"gal@galamar.net", phone:"054-3377591" },
    { resellerId:"010613", name:"משה דגן", role:"עסקי", position:"בעלים", email:"moshe@dgm.co.il", phone:"050-7913250" },
    { resellerId:"072883", name:"צחי ארז", role:"עסקי", position:"בעלים", email:"tsahy@gibs.co.il", phone:"054-4571371" },
    { resellerId:"038002", name:"ניר שושני", role:"עסקי", position:"בעלים", email:"nir@acss.co.il", phone:"052-3297794" },
    { resellerId:"064961", name:"בועז", role:"טכני", position:"טכני", email:"boaz@umbrella-it.co.il", phone:"052-3753538" },
    { resellerId:"064961", name:"אסף לגזיאל", role:"עסקי", position:"בעלים", email:"asaf@umbrella-it.co.il", phone:"054-4487776" },
    { resellerId:"042054", name:"יואל", role:"עסקי", position:"בעלים", email:"joel@efratnetworks.net", phone:"052-3983374" },
    { resellerId:"042054", name:"תומס", role:"טכני", position:"", email:"tomas@efratnetworks.net", phone:"052-6399276" },
    { resellerId:"081765", name:"יונתן", role:"עסקי", position:"מכירות", email:"yonatan@yhm.co.il", phone:"054-7223292" },
    { resellerId:"081765", name:"יוסי חגג", role:"עסקי", position:"בעלים", email:"yossi@yhm.co.il", phone:"050-8555575" },
    { resellerId:"082474", name:"בוריס בקמן", role:"עסקי", position:"בעלים", email:"boris@katom-it.co.il", phone:"052-5678963" },
    { resellerId:"082474", name:"אלקס לרקין", role:"טכני", position:"טכני", email:"alex@katom-it.co.il", phone:"052-5163900" },
    { resellerId:"082470", name:"דוד מחיטריאן", role:"טכני", position:"בעלים", email:"david@it-m.co.il", phone:"054-2189016" },
    { resellerId:"082470", name:"ערן לבון", role:"עסקי", position:"בעלים", email:"eran@it-m.co.il", phone:"054-5747550" },
    { resellerId:"028827", name:"דודו נחום", role:"עסקי", position:"", email:"dudu@guyshivuk.com", phone:"050-7257144" },
    { resellerId:"046936", name:"אייל בארי", role:"עסקי", position:"", email:"ayal@egozz.com", phone:"052-9408758" },
    { resellerId:"046936", name:"דניאל", role:"עסקי", position:"בעלים", email:"daniel@egozz.com", phone:"054-2254252" },
    { resellerId:"083210", name:"אפי מססה", role:"עסקי", position:"בעלים", email:"efi@inovit.co.il", phone:"050-4771149" },
    { resellerId:"083210", name:"דרור", role:"עסקי", position:"מכירות", email:"dror@inovit.co.il", phone:"054-8828788" },
  ];

  const initWithContacts = INIT_RESELLERS.map(r => ({
    ...r,
    contacts: CONTACTS_RAW.filter(c => c.resellerId === r.id)
  }));

  const [resellers,setResellers]=useState(()=>{
    const saved = ld(SK.res, null);
    if (saved) {
      return saved.map(r => ({
        ...r,
        contacts: (r.contacts && r.contacts.length > 0)
          ? r.contacts
          : CONTACTS_RAW.filter(c => c.resellerId === r.id)
      }));
    }
    return initWithContacts;
  });
  const [customPrices,setCustomPrices]=useState(()=>ld(SK.prices,{corp:null,edu:null,perpCorp:null,perpEdu:null}));
  const [consumption,setConsumption]=useState(()=>ld(SK.cons,{}));

  const [tab,setTab]=useState("resellers");
  const [search,setSearch]=useState("");
  const [sel,setSel]=useState(null);
  const [editMode,setEditMode]=useState(false);
  const [editData,setEditData]=useState(null);
  const [showAddReseller,setShowAddReseller]=useState(false);
  const [newRes,setNewRes]=useState({name:"",nameHe:"",id:"",discount:12.5,address:"",phone:"",email:""});
  const [confirmDelete,setConfirmDelete]=useState(null);

  const [priceTab,setPriceTab]=useState("corp");
  const [priceSearch,setPriceSearch]=useState("");
  const [priceRes,setPriceRes]=useState("");
  const [priceModel,setPriceModel]=useState("annual");

  const [calc365Items,setCalc365Items]=useState([{type:"corp",sku:"",qty:1}]);
  const [calcRes,setCalcRes]=useState("");
  const [calcModel,setCalcModel]=useState("annual");

  const [calcPerpItems,setCalcPerpItems]=useState([{type:"perpCorp",sku:"",qty:1}]);
  const [perpExtra,setPerpExtra]=useState(0);

  const [consMonth,setConsMonth]=useState(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;});
  const [prevMonth,setPrevMonth]=useState(()=>{const d=new Date();d.setMonth(d.getMonth()-1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;});

  const fileRef=useRef();

  useEffect(()=>sv(SK.res,resellers),[resellers]);
  useEffect(()=>sv(SK.cons,consumption),[consumption]);
  useEffect(()=>sv(SK.prices,customPrices),[customPrices]);

  const getList = t => customPrices[t]||(t==="corp"?CLOUD_CORP:t==="edu"?CLOUD_EDU:t==="perpCorp"?PERP_CORP:PERP_EDU);
  const isPerp = priceTab==="perpCorp"||priceTab==="perpEdu";
  const priceResObj = resellers.find(r=>r.id===priceRes);
  const priceDisc = priceResObj?priceResObj.discount:12.5;
  const curList = getList(priceTab);
  const calcResObj = resellers.find(r=>r.id===calcRes);
  const calcDisc = calcResObj?calcResObj.discount:12.5;

  const filteredPrices = useMemo(()=>{
    const q=priceSearch.toLowerCase();
    return curList.filter(p=>p.desc.toLowerCase().includes(q)||p.sku.toLowerCase().includes(q)||(p.group||"").toLowerCase().includes(q));
  },[curList,priceSearch,priceTab]);

  const filtered = useMemo(()=>{
    const q=search.toLowerCase();
    return resellers.filter(r=>r.name.toLowerCase().includes(q)||(r.nameHe||"").includes(q)||r.id.includes(q)||(r.address||"").includes(q));
  },[resellers,search]);

  const total365 = calc365Items.reduce((s,item)=>{
    const list=getList(item.type); const prod=list.find(p=>p.sku===item.sku); if(!prod) return s;
    const base=calcModel==="annual"?prod.annualE:calcModel==="monthly"?prod.monthlyE:prod.mthlyE;
    if(!base) return s;
    return s+dp(base,calcDisc)*Number(item.qty||1);
  },0);

  const totalPerp = calcPerpItems.reduce((s,item)=>{
    const list=getList(item.type); const prod=list.find(p=>p.sku===item.sku); if(!prod) return s;
    return s + dp(prod.partnerPrice,perpExtra) * Number(item.qty||1);
  },0);

  function handleCSV(e) {
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      const lines=ev.target.result.split("\n").filter(l=>l.trim());
      const headers=lines[0].split(",").map(h=>h.trim().replace(/"/g,"").toLowerCase());
      const descIdx=headers.findIndex(h=>h.includes("description"));
      const euAnn=headers.findIndex(h=>h.includes("end user")&&h.includes("annual")&&!h.includes("monthly"));
      const euMon=headers.findIndex(h=>h.includes("end user")&&h.includes("monthly")&&!h.includes("commit"));
      const skuIdx=headers.findIndex(h=>h.includes("sku"));
      if(descIdx===-1){alert("לא זוהה עמודת Description");return;}
      const rows=lines.slice(1).map(line=>{
        const cols=line.split(",").map(c=>c.trim().replace(/[$",]/g,""));
        return{sku:skuIdx>=0?cols[skuIdx]:"",desc:cols[descIdx]||"",
          annualE:euAnn>=0&&cols[euAnn]?parseFloat(cols[euAnn])||null:null,
          monthlyE:euMon>=0&&cols[euMon]?parseFloat(cols[euMon])||null:null,mthlyE:null};
      }).filter(r=>r.desc);
      const isP=rows.some(r=>r.desc.toLowerCase().includes("windows server")||r.desc.toLowerCase().includes("office ltsc"));
      const isE=rows.some(r=>r.desc.toLowerCase().includes("faculty")||r.desc.toLowerCase().includes("student"));
      const key=isP?(isE?"perpEdu":"perpCorp"):(isE?"edu":"corp");
      if(isP){setCustomPrices(p=>({...p,[key]:rows.map(r=>({sku:r.sku,group:"Imported",desc:r.desc,partnerPrice:r.annualE||0}))}));}
      else{setCustomPrices(p=>({...p,[key]:rows}));}
      alert(`✅ ${rows.length} מוצרים (${key})`);
    };
    reader.readAsText(file); e.target.value="";
  }

  function startEdit(r){setEditData(JSON.parse(JSON.stringify(r)));setEditMode(true);}
  function saveEdit(){setResellers(p=>p.map(r=>r.id===editData.id?editData:r));setSel(editData);setEditMode(false);setEditData(null);}
  function addReseller(){
    if(!newRes.name||!newRes.id) return alert("שם ומספר חובה");
    if(resellers.find(r=>r.id===newRes.id)) return alert("מספר כבר קיים");
    setResellers(p=>[...p,{...newRes,contacts:[]}]);
    setNewRes({name:"",nameHe:"",id:"",discount:12.5,address:"",phone:"",email:""});
    setShowAddReseller(false);
  }
  function confirmDeleteDo(){setResellers(p=>p.filter(r=>r.id!==confirmDelete));setSel(null);setConfirmDelete(null);}
  const getC=(id,m)=>consumption[`${id}_${m}`]||"";
  const setC=(id,m,v)=>setConsumption(p=>({...p,[`${id}_${m}`]:v}));

  const navTabs=[["resellers","👥 משווקים"],["prices","💰 מחירונים"],["calc365","🧮 מחשבון 365"],["calcPerp","💿 Perpetual"],["consumption","📊 צריכה"]];

  return (
    <div dir="rtl" style={{fontFamily:"Arial,sans-serif",background:"#f0f4ff",minHeight:"100vh",fontSize:14}}>
      {confirmDelete&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
          <div style={{background:"#fff",borderRadius:12,padding:24,width:280,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:8}}>🗑</div>
            <div style={{fontWeight:"bold",marginBottom:8}}>למחוק משווק זה?</div>
            <div style={{fontSize:12,color:"#888",marginBottom:16}}>פעולה זו לא ניתנת לביטול</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setConfirmDelete(null)} style={{flex:1,padding:10,background:"#f1f5f9",border:"none",borderRadius:8,cursor:"pointer",fontWeight:"bold"}}>ביטול</button>
              <button onClick={confirmDeleteDo} style={{flex:1,padding:10,background:"#dc2626",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:"bold"}}>מחק</button>
            </div>
          </div>
        </div>
      )}

      <div style={{background:"linear-gradient(135deg,#0078d4,#106ebe)",padding:"10px 16px",color:"#fff"}}>
        <div style={{fontSize:17,fontWeight:"bold"}}>🏢 מנהל משווקים Microsoft</div>
        <div style={{fontSize:11,opacity:0.8}}>Slava Obedin · מרץ 2026</div>
      </div>

      <div style={{display:"flex",background:"#fff",borderBottom:"2px solid #e0e7ff",overflowX:"auto"}}>
        {navTabs.map(([id,label])=>(
          <button key={id} onClick={()=>{setTab(id);setSel(null);setEditMode(false);setShowAddReseller(false);}}
            style={{padding:"10px 12px",border:"none",background:"none",cursor:"pointer",fontWeight:tab===id?"bold":"normal",
              borderBottom:tab===id?"3px solid #0078d4":"3px solid transparent",color:tab===id?"#0078d4":"#444",whiteSpace:"nowrap",fontSize:12}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{padding:12,maxWidth:900,margin:"0 auto"}}>

        {tab==="resellers"&&!sel&&!showAddReseller&&(
          <div>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 חפש שם, מספר, כתובת..."
                style={{flex:1,padding:"10px 12px",border:"1px solid #c7d2fe",borderRadius:8,fontSize:14}}/>
              <button onClick={()=>setShowAddReseller(true)} style={{background:"#059669",color:"#fff",border:"none",borderRadius:8,padding:"0 14px",cursor:"pointer",fontWeight:"bold",whiteSpace:"nowrap"}}>+ הוסף</button>
            </div>
            <div style={{fontSize:12,color:"#888",marginBottom:8}}>{filtered.length} משווקים</div>
            {filtered.map(r=>(
              <div key={r.id} onClick={()=>setSel(r)}
                style={{background:"#fff",border:"1px solid #e0e7ff",borderRadius:10,padding:"10px 14px",marginBottom:8,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:"bold",color:"#1e40af"}}>{r.name}</div>
                  {r.nameHe&&<div style={{fontSize:12,color:"#555"}}>{r.nameHe}</div>}
                  <div style={{fontSize:12,color:"#888"}}>#{r.id} · {r.discount}%{r.address?` · ${r.address}`:""}</div>
                </div>
                <div style={{color:"#0078d4",fontSize:18}}>›</div>
              </div>
            ))}
          </div>
        )}

        {tab==="resellers"&&showAddReseller&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <button onClick={()=>setShowAddReseller(false)} style={{border:"none",background:"none",color:"#0078d4",cursor:"pointer",fontSize:13}}>← ביטול</button>
              <button onClick={addReseller} style={{background:"#059669",color:"#fff",border:"none",borderRadius:6,padding:"6px 14px",cursor:"pointer"}}>+ הוסף</button>
            </div>
            <div style={{background:"#fff",borderRadius:12,padding:16,border:"1px solid #e0e7ff"}}>
              <div style={{fontWeight:"bold",marginBottom:12,color:"#1e40af"}}>הוספת משווק חדש</div>
              {[["name","שם באנגלית *"],["nameHe","שם בעברית"],["id","מספר משווק *"],["address","כתובת"],["phone","טלפון"],["email","אימייל"]].map(([f,l])=>(
                <div key={f}>
                  <label style={{fontSize:12,color:"#666"}}>{l}</label>
                  <input value={newRes[f]||""} onChange={e=>setNewRes(p=>({...p,[f]:e.target.value}))}
                    style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,marginBottom:8,boxSizing:"border-box"}}/>
                </div>
              ))}
              <label style={{fontSize:12,color:"#666"}}>אחוז הנחה (%)</label>
              <input type="number" value={newRes.discount} onChange={e=>setNewRes(p=>({...p,discount:parseFloat(e.target.value)||0}))}
                style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,marginBottom:8,boxSizing:"border-box"}}/>
            </div>
          </div>
        )}

        {tab==="resellers"&&sel&&!editMode&&(
          <div>
            <button onClick={()=>setSel(null)} style={{border:"none",background:"none",color:"#0078d4",cursor:"pointer",fontSize:13,marginBottom:12}}>← חזור</button>
            <div style={{background:"#fff",borderRadius:12,padding:16,border:"1px solid #e0e7ff"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <div style={{fontSize:18,fontWeight:"bold",color:"#1e40af"}}>{sel.name}</div>
                  {sel.nameHe&&<div style={{fontSize:14,color:"#555",marginBottom:2}}>{sel.nameHe}</div>}
                  <div style={{fontSize:12,color:"#888"}}>מספר: {sel.id}</div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button onClick={()=>startEdit(sel)} style={{background:"#0078d4",color:"#fff",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12}}>✏️ ערוך</button>
                  <button onClick={()=>setConfirmDelete(sel.id)} style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12}}>🗑 מחק</button>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
                <div style={{background:"#eff6ff",borderRadius:8,padding:10}}>
                  <div style={{fontSize:11,color:"#888"}}>הנחה</div>
                  <div style={{fontSize:22,fontWeight:"bold",color:"#1e40af"}}>{sel.discount}%</div>
                </div>
                {sel.address&&<div style={{background:"#fefce8",borderRadius:8,padding:10}}>
                  <div style={{fontSize:11,color:"#888"}}>📍 כתובת</div>
                  <div style={{fontSize:12,color:"#713f12"}}>{sel.address}</div>
                </div>}
              </div>
              {sel.phone&&<div style={{marginBottom:8}}><a href={`tel:${sel.phone}`} style={{display:"inline-flex",alignItems:"center",gap:6,background:"#0078d4",color:"#fff",padding:"8px 16px",borderRadius:8,textDecoration:"none",fontSize:13}}>📞 {sel.phone}</a></div>}
              {sel.email&&<div style={{marginBottom:16}}><a href={`mailto:${sel.email}`} style={{display:"inline-flex",alignItems:"center",gap:6,background:"#059669",color:"#fff",padding:"8px 16px",borderRadius:8,textDecoration:"none",fontSize:13}}>✉️ {sel.email}</a></div>}
              <div style={{fontWeight:"bold",marginBottom:8}}>אנשי קשר ({(sel.contacts||[]).length})</div>
              {(sel.contacts||[]).map((c,i)=>(
                <div key={i} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:10,marginBottom:8}}>
                  <div style={{fontWeight:"bold",marginBottom:4}}>{c.name} <span style={{fontSize:11,color:"#888",fontWeight:"normal"}}>· {c.role}{c.position?` · ${c.position}`:""}</span></div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {c.phone&&<a href={`tel:${c.phone}`} style={{color:"#0078d4",textDecoration:"none",fontSize:12}}>📞 {c.phone}</a>}
                    {c.email&&<a href={`mailto:${c.email}`} style={{color:"#059669",textDecoration:"none",fontSize:12}}>✉️ {c.email}</a>}
                  </div>
                </div>
              ))}
              {(!sel.contacts||sel.contacts.length===0)&&<div style={{color:"#aaa",fontSize:12,fontStyle:"italic"}}>אין אנשי קשר</div>}
            </div>
          </div>
        )}

        {tab==="resellers"&&editMode&&editData&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
              <button onClick={()=>{setEditMode(false);setEditData(null);}} style={{border:"none",background:"none",color:"#0078d4",cursor:"pointer",fontSize:13}}>← ביטול</button>
              <button onClick={saveEdit} style={{background:"#059669",color:"#fff",border:"none",borderRadius:6,padding:"6px 14px",cursor:"pointer"}}>💾 שמור</button>
            </div>
            <div style={{background:"#fff",borderRadius:12,padding:16,border:"1px solid #e0e7ff"}}>
              <div style={{fontWeight:"bold",fontSize:16,marginBottom:12,color:"#1e40af"}}>{editData.name}</div>
              {[["nameHe","שם בעברית"],["address","כתובת"],["phone","טלפון ראשי"],["email","אימייל ראשי"]].map(([f,l])=>(
                <div key={f}>
                  <label style={{fontSize:12,color:"#666"}}>{l}</label>
                  <input value={editData[f]||""} onChange={e=>setEditData(p=>({...p,[f]:e.target.value}))}
                    style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,marginBottom:8,boxSizing:"border-box"}}/>
                </div>
              ))}
              <label style={{fontSize:12,color:"#666"}}>אחוז הנחה (%)</label>
              <input type="number" value={editData.discount} onChange={e=>setEditData(p=>({...p,discount:parseFloat(e.target.value)||0}))}
                style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,marginBottom:16,boxSizing:"border-box"}}/>
              <div style={{fontWeight:"bold",marginBottom:8}}>אנשי קשר</div>
              {(editData.contacts||[]).map((c,i)=>(
                <div key={i} style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:10,marginBottom:8}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:6}}>
                    {[["name","שם"],["position","תפקיד"],["phone","טלפון"],["email","אימייל"]].map(([f,l])=>(
                      <div key={f}>
                        <label style={{fontSize:11,color:"#888"}}>{l}</label>
                        <input value={c[f]||""} onChange={e=>{const nc=[...editData.contacts];nc[i]={...nc[i],[f]:e.target.value};setEditData(p=>({...p,contacts:nc}))}}
                          style={{width:"100%",padding:6,border:"1px solid #d1d5db",borderRadius:4,fontSize:12,boxSizing:"border-box"}}/>
                      </div>
                    ))}
                  </div>
                  <select value={c.role||"עסקי"} onChange={e=>{const nc=[...editData.contacts];nc[i]={...nc[i],role:e.target.value};setEditData(p=>({...p,contacts:nc}))}}
                    style={{padding:"4px 8px",border:"1px solid #d1d5db",borderRadius:4,fontSize:12,marginBottom:6}}>
                    <option value="עסקי">עסקי</option><option value="טכני">טכני</option>
                  </select>
                  <button onClick={()=>setEditData(p=>({...p,contacts:p.contacts.filter((_,idx)=>idx!==i)}))}
                    style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:4,padding:"4px 8px",cursor:"pointer",fontSize:11}}>🗑 הסר</button>
                </div>
              ))}
              <button onClick={()=>setEditData(p=>({...p,contacts:[...(p.contacts||[]),{name:"",role:"עסקי",position:"",email:"",phone:""}]}))}
                style={{background:"#eff6ff",color:"#0078d4",border:"1px dashed #93c5fd",borderRadius:6,padding:"8px 14px",cursor:"pointer",width:"100%",marginTop:4}}>+ הוסף איש קשר</button>
            </div>
          </div>
        )}

        {tab==="prices"&&(
          <div>
            <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
              {[["corp","☁️ Cloud Corp"],["edu","🎓 Cloud חינוך"],["perpCorp","💿 Perp Corp"],["perpEdu","🎓 Perp חינוך"]].map(([k,l])=>(
                <button key={k} onClick={()=>setPriceTab(k)} style={{padding:"6px 12px",borderRadius:6,border:"1px solid #c7d2fe",cursor:"pointer",background:priceTab===k?"#0078d4":"#fff",color:priceTab===k?"#fff":"#374151",fontSize:12}}>{l}</button>
              ))}
              <button onClick={()=>fileRef.current.click()} style={{padding:"6px 12px",borderRadius:6,border:"1px solid #059669",cursor:"pointer",background:"#f0fdf4",color:"#059669",fontSize:12}}>📂 טען CSV</button>
              <input ref={fileRef} type="file" accept=".csv" onChange={handleCSV} style={{display:"none"}}/>
              {customPrices[priceTab]&&<button onClick={()=>setCustomPrices(p=>({...p,[priceTab]:null}))} style={{padding:"4px 8px",borderRadius:4,border:"1px solid #f59e0b",background:"#fef3c7",color:"#92400e",fontSize:11,cursor:"pointer"}}>↺ איפוס</button>}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
              <input value={priceSearch} onChange={e=>setPriceSearch(e.target.value)} placeholder="🔍 חפש מוצר..."
                style={{flex:1,minWidth:150,padding:"8px 10px",border:"1px solid #c7d2fe",borderRadius:6,fontSize:13}}/>
              {!isPerp&&<select value={priceRes} onChange={e=>setPriceRes(e.target.value)} style={{padding:"8px 10px",border:"1px solid #c7d2fe",borderRadius:6,fontSize:12}}>
                <option value="">ברירת מחדל (12.5%)</option>
                {resellers.map(r=><option key={r.id} value={r.id}>{r.name} ({r.discount}%)</option>)}
              </select>}
              {!isPerp&&<select value={priceModel} onChange={e=>setPriceModel(e.target.value)} style={{padding:"8px 10px",border:"1px solid #c7d2fe",borderRadius:6,fontSize:12}}>
                <option value="annual">שנתי/שנתי</option>
                <option value="monthly">שנתי/חודשי</option>
                <option value="mthly">חודשי/חודשי</option>
              </select>}
            </div>
            {isPerp&&<div style={{background:"#fef3c7",border:"1px solid #fcd34d",borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:12,color:"#92400e"}}>💡 מחיר משווק = Partner Price פחות 2% · לקוח סופי = Partner Price</div>}
            {!isPerp&&<div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:12,color:"#1e40af"}}>💡 מחיר משווק = End User Price פחות {priceDisc}% · לקוח סופי = End User Price</div>}
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:8,fontSize:12}}>
                <thead><tr style={{background:"#0078d4",color:"#fff"}}>
                  <th style={{padding:"8px 10px",textAlign:"right"}}>מוצר</th>
                  <th style={{padding:"8px 6px",textAlign:"center",background:"#1a6fc4"}}>מחיר משווק</th>
                  <th style={{padding:"8px 6px",textAlign:"center"}}>לקוח סופי</th>
                </tr></thead>
                <tbody>
                  {filteredPrices.slice(0,100).map((p,i)=>{
                    if(isPerp){return(<tr key={p.sku} style={{background:i%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"}}>
                      <td style={{padding:"6px 10px"}}><div style={{fontWeight:"bold"}}>{p.desc}</div><div style={{fontSize:10,color:"#aaa"}}>{p.sku} · {p.group}</div></td>
                      <td style={{padding:"6px",textAlign:"center",fontWeight:"bold",color:"#0078d4",background:"#eff6ff"}}>{fmt(dp(p.partnerPrice,2))}</td>
                      <td style={{padding:"6px",textAlign:"center",color:"#888"}}>{fmt(p.partnerPrice)}</td>
                    </tr>);}
                    const eu=priceModel==="annual"?p.annualE:priceModel==="monthly"?p.monthlyE:p.mthlyE;
                    return(<tr key={p.sku} style={{background:i%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"}}>
                      <td style={{padding:"6px 10px"}}><div style={{fontWeight:"bold"}}>{p.desc}</div><div style={{fontSize:10,color:"#aaa"}}>{p.sku}</div></td>
                      <td style={{padding:"6px",textAlign:"center",fontWeight:"bold",color:"#0078d4",background:"#eff6ff"}}>{fmt(eu!=null?dp(eu,priceDisc):null)}</td>
                      <td style={{padding:"6px",textAlign:"center",color:"#888"}}>{fmt(eu)}</td>
                    </tr>);
                  })}
                </tbody>
              </table>
              {filteredPrices.length>100&&<div style={{textAlign:"center",padding:8,color:"#888",fontSize:11}}>מציג 100 מתוך {filteredPrices.length}</div>}
            </div>
          </div>
        )}

        {tab==="calc365"&&(
          <div>
            <div style={{background:"#fff",borderRadius:12,padding:16,border:"1px solid #e0e7ff",marginBottom:12}}>
              <div style={{fontWeight:"bold",marginBottom:10,color:"#1e40af"}}>🧮 מחשבון Cloud 365</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}>
                <div>
                  <label style={{fontSize:12,color:"#666"}}>משווק</label>
                  <select value={calcRes} onChange={e=>setCalcRes(e.target.value)} style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,fontSize:12}}>
                    <option value="">ברירת מחדל (12.5%)</option>
                    {resellers.map(r=><option key={r.id} value={r.id}>{r.name} ({r.discount}%)</option>)}
                  </select>
                </div>
                <div>
                  <label style={{fontSize:12,color:"#666"}}>מודל תשלום</label>
                  <select value={calcModel} onChange={e=>setCalcModel(e.target.value)} style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,fontSize:12}}>
                    <option value="annual">שנתי/שנתי</option>
                    <option value="monthly">שנתי/חודשי</option>
                    <option value="mthly">חודשי/חודשי</option>
                  </select>
                </div>
              </div>
              <div style={{fontSize:12,color:"#555"}}>הנחה: <strong style={{color:"#0078d4"}}>{calcDisc}%</strong> מה-End User Price</div>
            </div>
            {calc365Items.map((item,i)=>{
              const list=getList(item.type);
              const prod=list.find(p=>p.sku===item.sku);
              let up=null;
              if(prod){const base=calcModel==="annual"?prod.annualE:calcModel==="monthly"?prod.monthlyE:prod.mthlyE;if(base)up=dp(base,calcDisc);}
              return(
                <div key={i} style={{background:"#fff",border:"1px solid #e0e7ff",borderRadius:10,padding:12,marginBottom:8}}>
                  <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto",gap:8,alignItems:"center"}}>
                    <select value={item.type} onChange={e=>setCalc365Items(p=>p.map((x,idx)=>idx===i?{...x,type:e.target.value,sku:""}:x))}
                      style={{padding:6,border:"1px solid #c7d2fe",borderRadius:5,fontSize:11}}>
                      <option value="corp">☁️ Corporate</option>
                      <option value="edu">🎓 חינוך</option>
                    </select>
                    <select value={item.sku} onChange={e=>setCalc365Items(p=>p.map((x,idx)=>idx===i?{...x,sku:e.target.value}:x))}
                      style={{padding:6,border:"1px solid #c7d2fe",borderRadius:5,fontSize:11}}>
                      <option value="">-- בחר מוצר --</option>
                      {list.map(p=><option key={p.sku} value={p.sku}>{p.desc}</option>)}
                    </select>
                    <input type="number" min="1" value={item.qty} onChange={e=>setCalc365Items(p=>p.map((x,idx)=>idx===i?{...x,qty:e.target.value}:x))}
                      style={{width:60,padding:6,border:"1px solid #c7d2fe",borderRadius:5,fontSize:12,textAlign:"center"}}/>
                    <button onClick={()=>setCalc365Items(p=>p.filter((_,idx)=>idx!==i))} style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:5,padding:"6px 8px",cursor:"pointer"}}>✕</button>
                  </div>
                  {up!=null&&<div style={{marginTop:6,fontSize:12,color:"#059669"}}>יחידה: {fmt(up)} · סה"כ: <strong>{fmt(up*Number(item.qty||1))}</strong></div>}
                </div>
              );
            })}
            <button onClick={()=>setCalc365Items(p=>[...p,{type:"corp",sku:"",qty:1}])}
              style={{width:"100%",padding:10,background:"#eff6ff",color:"#0078d4",border:"1px dashed #93c5fd",borderRadius:8,cursor:"pointer",marginBottom:12}}>+ הוסף מוצר</button>
            <div style={{background:"linear-gradient(135deg,#0078d4,#106ebe)",borderRadius:12,padding:16,color:"#fff",textAlign:"center"}}>
              <div style={{fontSize:13,opacity:0.85}}>סה"כ Cloud 365</div>
              <div style={{fontSize:32,fontWeight:"bold"}}>{fmt(total365)}</div>
              <div style={{fontSize:11,opacity:0.7}}>הנחה {calcDisc}% מ-End User Price</div>
            </div>
          </div>
        )}

        {tab==="calcPerp"&&(
          <div>
            <div style={{background:"#fff",borderRadius:12,padding:16,border:"1px solid #e0e7ff",marginBottom:12}}>
              <div style={{fontWeight:"bold",marginBottom:10,color:"#7c3aed"}}>💿 מחשבון Perpetual</div>
              <div style={{background:"#fef3c7",border:"1px solid #fcd34d",borderRadius:8,padding:"10px 12px",marginBottom:10,fontSize:12,color:"#92400e"}}>
                💡 מחיר = Partner Price פחות % שאתה מגדיר
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:13,color:"#7c3aed",fontWeight:"bold"}}>הנחה:</span>
                <input type="number" min="0" max="50" step="0.5" value={perpExtra}
                  onChange={e=>setPerpExtra(parseFloat(e.target.value)||0)}
                  style={{width:80,padding:"6px 10px",border:"2px solid #7c3aed",borderRadius:8,fontSize:16,textAlign:"center",fontWeight:"bold"}}/>
                <span style={{fontSize:13,color:"#7c3aed"}}>%</span>
              </div>
            </div>
            {calcPerpItems.map((item,i)=>{
              const list=getList(item.type);
              const prod=list.find(p=>p.sku===item.sku);
              const up=prod?dp(prod.partnerPrice,perpExtra):null;
              return(
                <div key={i} style={{background:"#fff",border:"1px solid #e0e7ff",borderRadius:10,padding:12,marginBottom:8}}>
                  <div style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto",gap:8,alignItems:"center"}}>
                    <select value={item.type} onChange={e=>setCalcPerpItems(p=>p.map((x,idx)=>idx===i?{...x,type:e.target.value,sku:""}:x))}
                      style={{padding:6,border:"1px solid #c7d2fe",borderRadius:5,fontSize:11}}>
                      <option value="perpCorp">🏢 Corporate</option>
                      <option value="perpEdu">🎓 חינוך</option>
                    </select>
                    <select value={item.sku} onChange={e=>setCalcPerpItems(p=>p.map((x,idx)=>idx===i?{...x,sku:e.target.value}:x))}
                      style={{padding:6,border:"1px solid #c7d2fe",borderRadius:5,fontSize:11}}>
                      <option value="">-- בחר מוצר --</option>
                      {list.map(p=><option key={p.sku} value={p.sku}>{p.desc} ({p.group})</option>)}
                    </select>
                    <input type="number" min="1" value={item.qty} onChange={e=>setCalcPerpItems(p=>p.map((x,idx)=>idx===i?{...x,qty:e.target.value}:x))}
                      style={{width:60,padding:6,border:"1px solid #c7d2fe",borderRadius:5,fontSize:12,textAlign:"center"}}/>
                    <button onClick={()=>setCalcPerpItems(p=>p.filter((_,idx)=>idx!==i))} style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:5,padding:"6px 8px",cursor:"pointer"}}>✕</button>
                  </div>
                  {up!=null&&prod&&<div style={{marginTop:6,fontSize:11,color:"#7c3aed"}}>
                    {fmt(prod.partnerPrice)} → -{perpExtra}% → <strong style={{color:"#059669"}}>{fmt(up)}</strong> × {item.qty} = <strong style={{color:"#059669"}}>{fmt(up*Number(item.qty||1))}</strong>
                  </div>}
                </div>
              );
            })}
            <button onClick={()=>setCalcPerpItems(p=>[...p,{type:"perpCorp",sku:"",qty:1}])}
              style={{width:"100%",padding:10,background:"#f5f3ff",color:"#7c3aed",border:"1px dashed #c4b5fd",borderRadius:8,cursor:"pointer",marginBottom:12}}>+ הוסף מוצר</button>
            <div style={{background:"linear-gradient(135deg,#7c3aed,#6d28d9)",borderRadius:12,padding:16,color:"#fff",textAlign:"center"}}>
              <div style={{fontSize:13,opacity:0.85}}>סה"כ Perpetual</div>
              <div style={{fontSize:32,fontWeight:"bold"}}>{fmt(totalPerp)}</div>
              <div style={{fontSize:11,opacity:0.7}}>Partner Price -{perpExtra}%</div>
            </div>
          </div>
        )}

        {tab==="consumption"&&(
          <div>
            <div style={{background:"#fff",borderRadius:10,padding:12,border:"1px solid #e0e7ff",marginBottom:12}}>
              <div style={{fontWeight:"bold",marginBottom:8,color:"#1e40af"}}>📊 מעקב צריכה</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div><label style={{fontSize:12,color:"#666"}}>חודש נוכחי</label><input type="month" value={consMonth} onChange={e=>setConsMonth(e.target.value)} style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,boxSizing:"border-box"}}/></div>
                <div><label style={{fontSize:12,color:"#666"}}>חודש קודם</label><input type="month" value={prevMonth} onChange={e=>setPrevMonth(e.target.value)} style={{width:"100%",padding:8,border:"1px solid #c7d2fe",borderRadius:6,boxSizing:"border-box"}}/></div>
              </div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",background:"#fff",borderRadius:8,fontSize:12}}>
                <thead><tr style={{background:"#0078d4",color:"#fff"}}>
                  <th style={{padding:"8px 10px",textAlign:"right"}}>משווק</th>
                  <th style={{padding:"8px",textAlign:"center",minWidth:110}}>חודש קודם</th>
                  <th style={{padding:"8px",textAlign:"center",minWidth:110}}>חודש נוכחי</th>
                  <th style={{padding:"8px",textAlign:"center",minWidth:80}}>שינוי</th>
                </tr></thead>
                <tbody>
                  {resellers.map((r,i)=>{
                    const prev=parseFloat(getC(r.id,prevMonth))||0;
                    const curr=parseFloat(getC(r.id,consMonth))||0;
                    const diff=curr-prev;
                    const pct=prev>0?((diff/prev)*100).toFixed(0):null;
                    return(<tr key={r.id} style={{background:i%2===0?"#f8fafc":"#fff",borderBottom:"1px solid #e2e8f0"}}>
                      <td style={{padding:"6px 10px"}}><div style={{fontWeight:"bold"}}>{r.name}</div>{r.nameHe&&<div style={{fontSize:11,color:"#777"}}>{r.nameHe}</div>}</td>
                      <td style={{padding:"4px 6px",textAlign:"center"}}><input type="number" value={getC(r.id,prevMonth)} onChange={e=>setC(r.id,prevMonth,e.target.value)} placeholder="0" style={{width:90,padding:4,border:"1px solid #d1d5db",borderRadius:4,textAlign:"center",fontSize:12}}/></td>
                      <td style={{padding:"4px 6px",textAlign:"center"}}><input type="number" value={getC(r.id,consMonth)} onChange={e=>setC(r.id,consMonth,e.target.value)} placeholder="0" style={{width:90,padding:4,border:"1px solid #d1d5db",borderRadius:4,textAlign:"center",fontSize:12}}/></td>
                      <td style={{padding:"4px 6px",textAlign:"center"}}>{(prev>0||curr>0)&&<span style={{color:diff>0?"#059669":diff<0?"#dc2626":"#888",fontWeight:"bold"}}>{diff>0?"▲":diff<0?"▼":"➡"} {Math.abs(diff).toFixed(0)}{pct?` (${pct}%)`:""}</span>}</td>
                    </tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
