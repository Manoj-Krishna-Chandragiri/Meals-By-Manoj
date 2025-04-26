import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

// Create SVG data URIs for missing images
const allCategoryIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23ff6347'/%3E%3Ctext x='50' y='55' font-size='20' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3EAll%3C/text%3E%3C/svg%3E";

// Fix the biryaniIcon SVG - remove the syntax error
const biryaniIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23e67e22'/%3E%3Cpath d='M25,42 C25,36 75,36 75,42 C75,60 65,65 50,65 C35,65 25,60 25,42 Z' fill='%23f39c12'/%3E%3Cpath d='M30,42 C30,40 70,40 70,42' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3Cpath d='M32,48 C32,46 68,46 68,48' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3Cpath d='M34,54 C34,52 66,52 66,54' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3Cpath d='M38,59 C38,58 62,58 62,59' stroke='%23ffffff' stroke-width='1.5' fill='none'/%3E%3Cpath d='M36,40 C40,38 60,38 64,40' stroke='%23d35400' stroke-width='1.5' fill='none'/%3E%3Ctext x='50' y='85' font-size='12' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3EBiryani%3C/text%3E%3C/svg%3E";

// Also fix the biryaniFood1 SVG - there appears to be some corrupted data
const biryaniFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cellipse cx='200' cy='180' rx='150' ry='100' fill='%23f39c12'/%3E%3Cpath d='M100,180 C150,140 250,140 300,180' stroke='%23e67e22' stroke-width='10' fill='none'/%3E%3Cpath d='M120,160 C150,140 250,140 280,160' stroke='%23e67e22' stroke-width='5' fill='none'/%3E%3Ccircle cx='150' cy='170' r='10' fill='%23c0392b'/%3E%3Ccircle cx='180' cy='190' r='8' fill='%232ecc71'/%3E%3Ccircle cx='230' cy='175' r='9' fill='%23c0392b'/%3E%3Ccircle cx='260' cy='190' r='7' fill='%232ecc71'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' font-weight='bold' fill='%23e67e22'%3EHyderabadi Biryani%3C/text%3E%3C/svg%3E";

const biryaniFood2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23ffeaa7'/%3E%3Cellipse cx='200' cy='180' rx='150' ry='100' fill='%23fab1a0'/%3E%3Cpath d='M100,180 C150,140 250,140 300,180' stroke='%23e17055' stroke-width='10' fill='none'/%3E%3Cpath d='M120,160 C150,140 250,140 280,160' stroke='%23e17055' stroke-width='5' fill='none'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' fill='%23d35400'%3EChicken Biryani%3C/text%3E%3C/svg%3E";

const biryaniFood3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23ffeaa7'/%3E%3Cellipse cx='200' cy='180' rx='150' ry='100' fill='%2355efc4'/%3E%3Cpath d='M100,180 C150,140 250,140 300,180' stroke='%2300b894' stroke-width='10' fill='none'/%3E%3Cpath d='M120,160 C150,140 250,140 280,160' stroke='%2300b894' stroke-width='5' fill='none'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' fill='%23006266'%3EVegetable Biryani%3C/text%3E%3C/svg%3E";

const biryaniFood4 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23ffeaa7'/%3E%3Cellipse cx='200' cy='180' rx='150' ry='100' fill='%23ff7675'/%3E%3Cpath d='M100,180 C150,140 250,140 300,180' stroke='%23d63031' stroke-width='10' fill='none'/%3E%3Cpath d='M120,160 C150,140 250,140 280,160' stroke='%23d63031' stroke-width='5' fill='none'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' fill='%23b71540'%3EMutton Biryani%3C/text%3E%3C/svg%3E";

// Use the SVG icons instead of trying to import missing files
const menu_all = allCategoryIcon;
const menu_9 = biryaniIcon;
const food_33 = biryaniFood1;
const food_34 = biryaniFood2;
const food_35 = biryaniFood3;
const food_36 = biryaniFood4;

// Continue with existing food imports
import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

// Create SVG data URIs for additional menu categories
const burgerMenuIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23e67e22'/%3E%3Cellipse cx='50' cy='40' rx='35' ry='5' fill='%23e74c3c'/%3E%3Cellipse cx='50' cy='50' rx='35' ry='5' fill='%232ecc71'/%3E%3Cellipse cx='50' cy='60' rx='35' ry='5' fill='%23e74c3c'/%3E%3Ctext x='50' y='80' font-size='10' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3EBurger%3C/text%3E%3C/svg%3E";

const soupMenuIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23c0392b'/%3E%3Cellipse cx='50' cy='50' rx='30' ry='15' fill='%23e74c3c'/%3E%3Cellipse cx='50' cy='45' rx='25' ry='5' fill='%23c0392b'/%3E%3Ccircle cx='42' cy='48' r='3' fill='%23f1c40f'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%232ecc71'/%3E%3Ccircle cx='58' cy='49' r='3' fill='%23f1c40f'/%3E%3Ctext x='50' y='80' font-size='10' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3ESoup%3C/text%3E%3C/svg%3E";

const drinksMenuIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%233498db'/%3E%3Cpath d='M35,30 L65,30 L60,70 L40,70 Z' fill='%232980b9'/%3E%3Cpath d='M35,30 L65,30 L62,40 L38,40 Z' fill='%2327ae60'/%3E%3Ccircle cx='50' cy='50' r='7' fill='%23f1c40f'/%3E%3Ctext x='50' y='85' font-size='10' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3EDrinks%3C/text%3E%3C/svg%3E";

const seafoodMenuIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%2327ae60'/%3E%3Cpath d='M30,50 C40,40 60,40 70,50 S60,65 30,50 Z' fill='%23bdc3c7'/%3E%3Ccircle cx='50' cy='45' r='5' fill='%23ecf0f1'/%3E%3Ctext x='50' y='80' font-size='10' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3ESeafood%3C/text%3E%3C/svg%3E";

// Create SVG data URIs for additional food items
const pizzaFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Ccircle cx='200' cy='200' r='150' fill='%23f3c761'/%3E%3Ccircle cx='200' cy='200' r='135' fill='%23e74c3c'/%3E%3Ccircle cx='200' cy='200' r='125' fill='%23f3c761'/%3E%3Cpath d='M130,130 L270,270 M130,270 L270,130' stroke='%23fff' stroke-width='5' stroke-linecap='round'/%3E%3Ccircle cx='150' cy='150' r='15' fill='%23e74c3c'/%3E%3Ccircle cx='250' cy='150' r='15' fill='%23e74c3c'/%3E%3Ccircle cx='250' cy='250' r='15' fill='%23e74c3c'/%3E%3Ccircle cx='150' cy='250' r='15' fill='%23e74c3c'/%3E%3Ccircle cx='200' cy='200' r='10' fill='%23e74c3c'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%23e74c3c'%3EMargherita Pizza%3C/text%3E%3C/svg%3E";

const pizzaFood2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Ccircle cx='200' cy='200' r='150' fill='%23f3c761'/%3E%3Ccircle cx='200' cy='200' r='135' fill='%23e74c3c'/%3E%3Ccircle cx='200' cy='200' r='125' fill='%23f3c761'/%3E%3Ccircle cx='150' cy='150' r='15' fill='%23c0392b'/%3E%3Ccircle cx='250' cy='150' r='15' fill='%23c0392b'/%3E%3Ccircle cx='250' cy='250' r='15' fill='%23c0392b'/%3E%3Ccircle cx='150' cy='250' r='15' fill='%23c0392b'/%3E%3Ccircle cx='200' cy='200' r='15' fill='%23c0392b'/%3E%3Ccircle cx='180' cy='120' r='15' fill='%23c0392b'/%3E%3Ccircle cx='220' cy='280' r='15' fill='%23c0392b'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%23c0392b'%3EPepperoni Pizza%3C/text%3E%3C/svg%3E";

const pizzaFood3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Ccircle cx='200' cy='200' r='150' fill='%23f3c761'/%3E%3Ccircle cx='200' cy='200' r='135' fill='%23e74c3c'/%3E%3Ccircle cx='200' cy='200' r='125' fill='%23f3c761'/%3E%3Ccircle cx='150' cy='150' r='12' fill='%232ecc71'/%3E%3Ccircle cx='250' cy='150' r='10' fill='%239b59b6'/%3E%3Ccircle cx='250' cy='250' r='12' fill='%232ecc71'/%3E%3Ccircle cx='150' cy='250' r='10' fill='%23e74c3c'/%3E%3Ccircle cx='200' cy='200' r='12' fill='%23f1c40f'/%3E%3Ccircle cx='180' cy='120' r='10' fill='%23e67e22'/%3E%3Ccircle cx='220' cy='280' r='12' fill='%232ecc71'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='22' font-weight='bold' fill='%232ecc71'%3EVegetable Supreme Pizza%3C/text%3E%3C/svg%3E";

const dessertFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Crect x='100' y='100' width='200' height='200' fill='%23663300'/%3E%3Crect x='120' y='120' width='160' height='160' fill='%234d2600'/%3E%3Ccircle cx='150' cy='150' r='10' fill='%23996633'/%3E%3Ccircle cx='250' cy='150' r='10' fill='%23996633'/%3E%3Ccircle cx='150' cy='250' r='10' fill='%23996633'/%3E%3Ccircle cx='250' cy='250' r='10' fill='%23996633'/%3E%3Ccircle cx='200' cy='200' r='10' fill='%23996633'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%23663300'%3EChocolate Brownie%3C/text%3E%3C/svg%3E";

const dessertFood2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Crect x='100' y='120' width='200' height='160' fill='%23f5d7a1'/%3E%3Crect x='100' y='120' width='200' height='40' fill='%23654321'/%3E%3Crect x='100' y='160' width='200' height='40' fill='%23e3cc9c'/%3E%3Crect x='100' y='200' width='200' height='40' fill='%23654321'/%3E%3Crect x='100' y='240' width='200' height='40' fill='%23e3cc9c'/%3E%3Cpath d='M100,120 L100,280 L300,280 L300,120 Z' fill='none' stroke='%23483C32' stroke-width='3'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%23483C32'%3ETiramisu%3C/text%3E%3C/svg%3E";

// Fix burger food SVGs
const burgerFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Ccircle cx='200' cy='200' r='150' fill='%23f5bb42'/%3E%3Cellipse cx='200' cy='160' rx='140' ry='20' fill='%23e67e22'/%3E%3Cellipse cx='200' cy='200' rx='140' ry='20' fill='%232ecc71'/%3E%3Cellipse cx='200' cy='240' rx='140' ry='20' fill='%23e67e22'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%23e67e22'%3EClassic Burger%3C/text%3E%3C/svg%3E";

const burgerFood2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Ccircle cx='200' cy='200' r='150' fill='%23f5bb42'/%3E%3Cellipse cx='200' cy='160' rx='140' ry='20' fill='%23e67e22'/%3E%3Cellipse cx='200' cy='200' rx='140' ry='20' fill='%23e74c3c'/%3E%3Cellipse cx='200' cy='240' rx='140' ry='20' fill='%23e67e22'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%23e67e22'%3EDouble Cheeseburger%3C/text%3E%3C/svg%3E";

// Fix soup food SVGs
const soupFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cellipse cx='200' cy='200' rx='120' ry='60' fill='%23e74c3c'/%3E%3Cellipse cx='200' cy='180' rx='100' ry='20' fill='%23c0392b'/%3E%3Ccircle cx='170' cy='190' r='10' fill='%23f1c40f'/%3E%3Ccircle cx='200' cy='200' r='8' fill='%232ecc71'/%3E%3Ccircle cx='230' cy='195' r='10' fill='%23f1c40f'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' font-weight='bold' fill='%23c0392b'%3ETomato Soup%3C/text%3E%3C/svg%3E";

const soupFood2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cellipse cx='200' cy='200' rx='120' ry='60' fill='%23f39c12'/%3E%3Cellipse cx='200' cy='180' rx='100' ry='20' fill='%23e67e22'/%3E%3Ccircle cx='170' cy='190' r='10' fill='%232ecc71'/%3E%3Ccircle cx='200' cy='200' r='8' fill='%233498db'/%3E%3Ccircle cx='230' cy='195' r='10' fill='%232ecc71'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' font-weight='bold' fill='%23e67e22'%3EChicken Soup%3C/text%3E%3C/svg%3E";

// Fix drink food SVGs
const drinkFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cpath d='M150,100 L250,100 L230,300 L170,300 Z' fill='%2327ae60'/%3E%3Cpath d='M150,100 L250,100 L240,150 L160,150 Z' fill='%232ecc71'/%3E%3Ccircle cx='200' cy='200' r='30' fill='%23f1c40f'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%2327ae60'%3EMint Lemonade%3C/text%3E%3C/svg%3E";

const drinkFood2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cpath d='M150,100 L250,100 L230,300 L170,300 Z' fill='%233498db'/%3E%3Cpath d='M150,100 L250,100 L240,150 L160,150 Z' fill='%232980b9'/%3E%3Ccircle cx='200' cy='200' r='30' fill='%23ecf0f1'/%3E%3Ctext x='200' y='340' text-anchor='middle' font-size='24' font-weight='bold' fill='%233498db'%3EBlueberry Smoothie%3C/text%3E%3C/svg%3E";

// Fix salad and seafood SVGs
const saladFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cellipse cx='200' cy='200' rx='120' ry='80' fill='%232ecc71'/%3E%3Ccircle cx='160' cy='180' r='20' fill='%23e74c3c'/%3E%3Ccircle cx='210' cy='190' r='15' fill='%23f1c40f'/%3E%3Ccircle cx='240' cy='170' r='18' fill='%23e74c3c'/%3E%3Ccircle cx='190' cy='220' r='15' fill='%23f39c12'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' font-weight='bold' fill='%232ecc71'%3EAvocado Salad%3C/text%3E%3C/svg%3E";

const seafoodFood1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cellipse cx='200' cy='200' rx='130' ry='80' fill='%233498db'/%3E%3Cpath d='M150,180 C180,150 220,150 250,180 C220,210 180,210 150,180 Z' fill='%23e74c3c'/%3E%3Ccircle cx='230' cy='170' r='10' fill='%23f1c40f'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' font-weight='bold' fill='%233498db'%3EGrilled Salmon%3C/text%3E%3C/svg%3E";

const seafoodFood2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Cellipse cx='200' cy='200' rx='130' ry='80' fill='%2327ae60'/%3E%3Cpath d='M150,190 C180,170 220,170 250,190 S220,220 150,190 Z' fill='%23bdc3c7'/%3E%3Ccircle cx='200' cy='180' r='20' fill='%23ecf0f1'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' font-weight='bold' fill='%2327ae60'%3EShrimp Pasta%3C/text%3E%3C/svg%3E";

const dessertFood3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Ccircle cx='200' cy='200' r='100' fill='%23e74c3c'/%3E%3Cpath d='M150,150 L250,150 L200,250 Z' fill='%23c0392b'/%3E%3Ccircle cx='200' cy='180' r='20' fill='%23ecf0f1'/%3E%3Ctext x='200' y='320' text-anchor='middle' font-size='24' font-weight='bold' fill='%23e74c3c'%3EStrawberry Cheesecake%3C/text%3E%3C/svg%3E";

// Use these for the new food items
const food_37 = pizzaFood1;
const food_38 = pizzaFood2;
const food_39 = pizzaFood3;
const food_40 = dessertFood1;
const food_41 = dessertFood2;
const food_42 = burgerFood1;
const food_43 = burgerFood2;
const food_44 = soupFood1;
const food_45 = soupFood2;
const food_46 = drinkFood1;
const food_47 = drinkFood2;
const food_48 = saladFood1;
const food_49 = seafoodFood1;
const food_50 = seafoodFood2;
const food_51 = dessertFood3;

const menu_burger = burgerMenuIcon;
const menu_soup = soupMenuIcon;
const menu_drinks = drinksMenuIcon;
const menu_seafood = seafoodMenuIcon;

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon,
    menu_all,  // Add the "All" category icon to assets
    menu_9     // Add the "Biryani" icon to assets
}

export const menu_list = [
    {
        menu_name: "Salad",
        menu_image: menu_1
    },
    {
        menu_name: "Rolls",
        menu_image: menu_2
    },
    {
        menu_name: "Deserts",
        menu_image: menu_3
    },
    {
        menu_name: "Sandwich",
        menu_image: menu_4
    },
    {
        menu_name: "Cake",
        menu_image: menu_5
    },
    {
        menu_name: "Pure Veg",
        menu_image: menu_6
    },
    {
        menu_name: "Pasta",
        menu_image: menu_7
    },
    {
        menu_name: "Noodles",
        menu_image: menu_8
    },
    {
        menu_name: "Biryani", 
        menu_image: menu_9
    },
    {
        menu_name: "Pizza",
        menu_image: pizzaFood1
    },
    {
        menu_name: "Burger",
        menu_image: menu_burger
    },
    {
        menu_name: "Soup",
        menu_image: menu_soup
    },
    {
        menu_name: "Drinks",
        menu_image: menu_drinks
    },
    {
        menu_name: "Seafood",
        menu_image: menu_seafood
    },
    {
        menu_name: "Dessert",
        menu_image: dessertFood1
    }
]

export const food_list = [
    {
        _id: "1",
        name: "Greek salad",
        image: food_1,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Veg salad",
        image: food_2,
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, 
    {
        _id: "3",
        name: "Clover Salad",
        image: food_3,
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, 
    {
        _id: "4",
        name: "Chicken Salad",
        image: food_4,
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, 
    {
        _id: "5",
        name: "Lasagna Rolls",
        image: food_5,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, 
    {
        _id: "6",
        name: "Peri Peri Rolls",
        image: food_6,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, 
    {
        _id: "7",
        name: "Chicken Rolls",
        image: food_7,
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, 
    {
        _id: "8",
        name: "Veg Rolls",
        image: food_8,
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, 
    {
        _id: "9",
        name: "Ripple Ice Cream",
        image: food_9,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, 
    {
        _id: "10",
        name: "Fruit Ice Cream",
        image: food_10,
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, 
    {
        _id: "11",
        name: "Jar Ice Cream",
        image: food_11,
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, 
    {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: food_12,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: food_13,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: food_14,
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, 
    {
        _id: "15",
        name: "Grilled Sandwich",
        image: food_15,
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, 
    {
        _id: "16",
        name: "Bread Sandwich",
        image: food_16,
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, 
    {
        _id: "17",
        name: "Cup Cake",
        image: food_17,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, 
    {
        _id: "18",
        name: "Vegan Cake",
        image: food_18,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, 
    {
        _id: "19",
        name: "Butterscotch Cake",
        image: food_19,
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, 
    {
        _id: "20",
        name: "Sliced Cake",
        image: food_20,
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, 
    {
        _id: "21",
        name: "Garlic Mushroom ",
        image: food_21,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, 
    {
        _id: "22",
        name: "Fried Cauliflower",
        image: food_22,
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, 
    {
        _id: "23",
        name: "Mix Veg Pulao",
        image: food_23,
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, 
    {
        _id: "24",
        name: "Rice Zucchini",
        image: food_24,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        image: food_25,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: food_26,
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, 
    {
        _id: "27",
        name: "Creamy Pasta",
        image: food_27,
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, 
    {
        _id: "28",
        name: "Chicken Pasta",
        image: food_28,
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, 
    {
        _id: "29",
        name: "Buttter Noodles",
        image: food_29,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, 
    {
        _id: "30",
        name: "Veg Noodles",
        image: food_30,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, 
    {
        _id: "31",
        name: "Somen Noodles",
        image: food_31,
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, 
    {
        _id: "32",
        name: "Cooked Noodles",
        image: food_32,
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    // Add Biryani items with the appropriate images
    {
        _id: "33",
        name: "Hyderabadi Biryani",
        image: food_33,
        price: 18,
        description: "Aromatic basmati rice layered with spicy marinated meat, slow-cooked to perfection",
        category: "Biryani"
    }, 
    {
        _id: "34",
        name: "Chicken Biryani",
        image: food_34,
        price: 16,
        description: "Flavorful rice dish with tender chicken pieces and authentic Indian spices",
        category: "Biryani"
    }, 
    {
        _id: "35",
        name: "Vegetable Biryani",
        image: food_35,
        price: 14,
        description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
        category: "Biryani"
    }, 
    {
        _id: "36",
        name: "Mutton Biryani",
        image: food_36,
        price: 22,
        description: "Rich and flavorful biryani with tender pieces of mutton and fragrant spices",
        category: "Biryani"
    },
    // Add new food items
    {
      _id: "37",
      name: "Margherita Pizza",
      image: food_37,
      price: 14,
      description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
      category: "Pizza"
    },
    {
      _id: "38",
      name: "Pepperoni Pizza",
      image: food_38,
      price: 16,
      description: "Traditional pizza topped with pepperoni slices and melted cheese",
      category: "Pizza"
    },
    {
      _id: "39",
      name: "Vegetable Supreme Pizza",
      image: food_39,
      price: 15,
      description: "Pizza loaded with bell peppers, olives, onions, and mushrooms",
      category: "Pizza"
    },
    {
      _id: "40",
      name: "Chocolate Brownie",
      image: food_40,
      price: 8,
      description: "Rich chocolate brownie with walnuts, served warm",
      category: "Dessert"
    },
    {
      _id: "41",
      name: "Tiramisu",
      image: food_41,
      price: 9,
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
      category: "Dessert"
    },
    {
      _id: "42",
      name: "Classic Burger",
      image: food_42,
      price: 12,
      description: "Juicy beef patty with fresh lettuce, tomato, and our special sauce on a toasted bun",
      category: "Burger"
    },
    {
      _id: "43",
      name: "Double Cheeseburger",
      image: food_43,
      price: 15,
      description: "Two beef patties with melted cheddar cheese, pickles, onions, and our signature sauce",
      category: "Burger"
    },
    {
      _id: "44",
      name: "Tomato Soup",
      image: food_44,
      price: 7,
      description: "Creamy tomato soup made with fresh tomatoes and herbs, served with croutons",
      category: "Soup"
    },
    {
      _id: "45",
      name: "Chicken Soup",
      image: food_45,
      price: 8,
      description: "Hearty chicken soup with vegetables and noodles, perfect for a cold day",
      category: "Soup"
    },
    {
      _id: "46",
      name: "Mint Lemonade",
      image: food_46,
      price: 5,
      description: "Refreshing lemonade with fresh mint leaves and a hint of sweetness",
      category: "Drinks"
    },
    {
      _id: "47",
      name: "Blueberry Smoothie",
      image: food_47,
      price: 6,
      description: "Creamy smoothie made with fresh blueberries, yogurt, and a touch of honey",
      category: "Drinks"
    },
    {
      _id: "48",
      name: "Avocado Salad",
      image: food_48,
      price: 11,
      description: "Fresh avocados with mixed greens, cherry tomatoes, and citrus vinaigrette",
      category: "Salad"
    },
    {
      _id: "49",
      name: "Grilled Salmon",
      image: food_49,
      price: 19,
      description: "Perfectly grilled salmon fillet with lemon butter sauce and steamed vegetables",
      category: "Seafood"
    },
    {
      _id: "50",
      name: "Shrimp Pasta",
      image: food_50,
      price: 17,
      description: "Linguine pasta with garlic butter shrimp, cherry tomatoes, and fresh herbs",
      category: "Seafood"
    },
    {
      _id: "51",
      name: "Strawberry Cheesecake",
      image: food_51,
      price: 8,
      description: "Creamy cheesecake topped with fresh strawberry compote on a graham cracker crust",
      category: "Dessert"
    }
]