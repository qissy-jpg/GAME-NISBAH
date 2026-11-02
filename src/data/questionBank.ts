import { RatioQuestion, StageId } from '../types/game';

export const QUESTION_BANK: RatioQuestion[] = [
  // ==========================================
  // EASY: CADET PILOT (23 Questions)
  // Focus: 4.1.1 basic 3-quantities, 4.1.2 two-quantity representation & basic simplification
  // ==========================================
  {
    id: 'e1',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Terdapat 6 biji epal merah dan 9 biji epal hijau. Cari nisbah epal merah kepada epal hijau dalam bentuk termudah.',
      en: 'There are 6 red apples and 9 green apples. Find the ratio of red apples to green apples in simplest form.'
    },
    options: ['2 : 3', '3 : 2', '6 : 3'],
    correctIndex: 0,
    explanation: {
      ms: 'Nisbah awal = 6 : 9. Faktor sepunya terbesar (FSTB) bagi 6 dan 9 ialah 3. Bahagikan kedua-dua nombor dengan 3: 6 ÷ 3 = 2 dan 9 ÷ 3 = 3. Maka, nisbah termudah ialah 2 : 3.',
      en: 'Initial ratio = 6 : 9. The highest common factor (HCF) of 6 and 9 is 3. Divide both terms by 3: 6 ÷ 3 = 2 and 9 ÷ 3 = 3. Thus, the simplest ratio is 2 : 3.'
    }
  },
  {
    id: 'e2',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Sebuah pesawat membawa 8 kotak merah dan 12 kotak biru. Cari nisbah kotak merah kepada kotak biru dalam bentuk termudah.',
      en: 'An airplane carries 8 red boxes and 12 blue boxes. Find the ratio of red boxes to blue boxes in simplest form.'
    },
    options: ['3 : 2', '2 : 3', '8 : 4'],
    correctIndex: 1,
    explanation: {
      ms: 'Nisbah kotak merah kepada biru = 8 : 12. FSTB bagi 8 dan 12 ialah 4. Bahagikan dengan 4: 8 ÷ 4 = 2 dan 12 ÷ 4 = 3. Maka jawapannya ialah 2 : 3.',
      en: 'Ratio of red boxes to blue boxes = 8 : 12. HCF of 8 and 12 is 4. Divide both by 4: 8 ÷ 4 = 2 and 12 ÷ 4 = 3. Therefore, the answer is 2 : 3.'
    }
  },
  {
    id: 'e3',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 15 : 25 kepada bentuk termudah.',
      en: 'Simplify the ratio 15 : 25 to its simplest form.'
    },
    options: ['5 : 3', '3 : 5', '1 : 2'],
    correctIndex: 1,
    explanation: {
      ms: 'FSTB bagi 15 dan 25 ialah 5. Bahagikan 15 ÷ 5 = 3 dan 25 ÷ 5 = 5. Maka, nisbah termudah ialah 3 : 5.',
      en: 'The HCF of 15 and 25 is 5. Divide 15 ÷ 5 = 3 and 25 ÷ 5 = 5. Therefore, the simplest ratio is 3 : 5.'
    }
  },
  {
    id: 'e4',
    difficulty: 'easy',
    dskpCode: '4.1.1',
    question: {
      ms: 'Di sebuah lapangan terbang terdapat 4 kapal terbang merah, 6 biru dan 8 kuning. Tulis nisbah merah : biru : kuning dalam bentuk termudah.',
      en: 'At an airfield there are 4 red planes, 6 blue planes and 8 yellow planes. Write the ratio red : blue : yellow in simplest form.'
    },
    options: ['2 : 3 : 4', '4 : 3 : 2', '1 : 2 : 3'],
    correctIndex: 0,
    explanation: {
      ms: 'Nisbah = 4 : 6 : 8. FSTB bagi 4, 6 dan 8 ialah 2. Bahagikan setiap nombor dengan 2: 4÷2=2, 6÷2=3, 8÷2=4. Nisbah termudah ialah 2 : 3 : 4.',
      en: 'Ratio = 4 : 6 : 8. HCF of 4, 6, and 8 is 2. Divide each term by 2: 4÷2=2, 6÷2=3, 8÷2=4. Simplest ratio is 2 : 3 : 4.'
    }
  },
  {
    id: 'e5',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Antara berikut, nisbah manakah yang setara dengan 2 : 5?',
      en: 'Which of the following ratios is equivalent to 2 : 5?'
    },
    options: ['4 : 10', '4 : 8', '5 : 2'],
    correctIndex: 0,
    explanation: {
      ms: 'Darabkan kedua-dua bahagian dengan 2: 2 × 2 = 4 dan 5 × 2 = 10. Maka 4 : 10 adalah setara dengan 2 : 5.',
      en: 'Multiply both terms by 2: 2 × 2 = 4 and 5 × 2 = 10. Thus 4 : 10 is equivalent to 2 : 5.'
    }
  },
  {
    id: 'e6',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 10 : 14.',
      en: 'Simplify the ratio 10 : 14.'
    },
    options: ['2 : 7', '5 : 7', '5 : 6'],
    correctIndex: 1,
    explanation: {
      ms: 'FSTB bagi 10 dan 14 ialah 2. 10 ÷ 2 = 5 dan 14 ÷ 2 = 7. Maka nisbah termudah ialah 5 : 7.',
      en: 'HCF of 10 and 14 is 2. 10 ÷ 2 = 5 and 14 ÷ 2 = 7. Thus simplest ratio is 5 : 7.'
    }
  },
  {
    id: 'e7',
    difficulty: 'easy',
    dskpCode: '4.1.1',
    question: {
      ms: 'Sebuah kotak mengandungi 3 pembaris, 5 pemadam dan 7 pensel. Apakah nisbah pembaris kepada pemadam kepada pensel?',
      en: 'A box contains 3 rulers, 5 erasers and 7 pencils. What is the ratio of rulers to erasers to pencils?'
    },
    options: ['5 : 3 : 7', '3 : 5 : 7', '7 : 5 : 3'],
    correctIndex: 1,
    explanation: {
      ms: 'Susunan kuantiti ialah pembaris (3), pemadam (5), pensel (7). Tiada faktor sepunya selain 1, jadi nisbahnya ialah 3 : 5 : 7.',
      en: 'The order is rulers (3), erasers (5), pencils (7). No common factors greater than 1, so the ratio is 3 : 5 : 7.'
    }
  },
  {
    id: 'e8',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Antara berikut, nisbah manakah yang setara dengan 3 : 4?',
      en: 'Which of the following ratios is equivalent to 3 : 4?'
    },
    options: ['6 : 8', '6 : 10', '9 : 16'],
    correctIndex: 0,
    explanation: {
      ms: 'Darabkan kedua-dua sebutan dengan 2: 3 × 2 = 6 dan 4 × 2 = 8. Nisbah 6 : 8 adalah setara dengan 3 : 4.',
      en: 'Multiply both terms by 2: 3 × 2 = 6 and 4 × 2 = 8. The ratio 6 : 8 is equivalent to 3 : 4.'
    }
  },
  {
    id: 'e9',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 14 : 21 kepada bentuk termudah.',
      en: 'Simplify the ratio 14 : 21 to its simplest form.'
    },
    options: ['7 : 3', '2 : 3', '2 : 7'],
    correctIndex: 1,
    explanation: {
      ms: 'FSTB bagi 14 dan 21 ialah 7. 14 ÷ 7 = 2 dan 21 ÷ 7 = 3. Maka nisbahnya ialah 2 : 3.',
      en: 'HCF of 14 and 21 is 7. 14 ÷ 7 = 2 and 21 ÷ 7 = 3. Therefore the ratio is 2 : 3.'
    }
  },
  {
    id: 'e10',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Tulis nisbah 20 minit kepada 30 minit dalam bentuk termudah.',
      en: 'Write the ratio of 20 minutes to 30 minutes in simplest form.'
    },
    options: ['1 : 2', '2 : 3', '4 : 5'],
    correctIndex: 1,
    explanation: {
      ms: 'Kedua-dua kuantiti mempunyai unit yang sama (minit). Bahagikan 20 dan 30 dengan 10: 20 ÷ 10 = 2 dan 30 ÷ 10 = 3. Jawapannya 2 : 3.',
      en: 'Both quantities have the same units (minutes). Divide 20 and 30 by 10: 20 ÷ 10 = 2 and 30 ÷ 10 = 3. Result is 2 : 3.'
    }
  },
  {
    id: 'e11',
    difficulty: 'easy',
    dskpCode: '4.1.1',
    question: {
      ms: 'Sebuah basikal mempunyai 2 roda, beca 3 roda, dan kereta 4 roda. Nyatakan nisbah roda basikal : beca : kereta.',
      en: 'A bicycle has 2 wheels, a tricycle 3 wheels, and a car 4 wheels. State the ratio bicycle : tricycle : car.'
    },
    options: ['2 : 3 : 4', '4 : 3 : 2', '3 : 2 : 4'],
    correctIndex: 0,
    explanation: {
      ms: 'Basikal = 2 roda, beca = 3 roda, kereta = 4 roda. Nisbahnya ialah 2 : 3 : 4.',
      en: 'Bicycle = 2 wheels, tricycle = 3 wheels, car = 4 wheels. The ratio is 2 : 3 : 4.'
    }
  },
  {
    id: 'e12',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 18 : 24.',
      en: 'Simplify the ratio 18 : 24.'
    },
    options: ['2 : 3', '3 : 4', '6 : 8'],
    correctIndex: 1,
    explanation: {
      ms: 'FSTB bagi 18 dan 24 ialah 6. 18 ÷ 6 = 3 dan 24 ÷ 6 = 4. Bentuk termudah ialah 3 : 4.',
      en: 'HCF of 18 and 24 is 6. 18 ÷ 6 = 3 and 24 ÷ 6 = 4. Simplest form is 3 : 4.'
    }
  },
  {
    id: 'e13',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Nisbah manakah yang setara dengan 1 : 4?',
      en: 'Which ratio is equivalent to 1 : 4?'
    },
    options: ['3 : 12', '2 : 6', '4 : 1'],
    correctIndex: 0,
    explanation: {
      ms: 'Darabkan 1 dan 4 dengan 3: 1 × 3 = 3 dan 4 × 3 = 12. Jadi 3 : 12 adalah setara dengan 1 : 4.',
      en: 'Multiply 1 and 4 by 3: 1 × 3 = 3 and 4 × 3 = 12. Hence 3 : 12 is equivalent to 1 : 4.'
    }
  },
  {
    id: 'e14',
    difficulty: 'easy',
    dskpCode: '4.1.1',
    question: {
      ms: 'Dalam satu pertandingan sukan, terdapat 5 pingat emas, 8 pingat perak dan 11 pingat gangsa. Tulis nisbah emas : perak : gangsa.',
      en: 'In a sports meet, there are 5 gold, 8 silver and 11 bronze medals. Write the ratio gold : silver : bronze.'
    },
    options: ['5 : 8 : 11', '8 : 5 : 11', '11 : 8 : 5'],
    correctIndex: 0,
    explanation: {
      ms: 'Emas = 5, Perak = 8, Gangsa = 11. Nisbah yang sepadan ialah 5 : 8 : 11.',
      en: 'Gold = 5, Silver = 8, Bronze = 11. The corresponding ratio is 5 : 8 : 11.'
    }
  },
  {
    id: 'e15',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 9 : 27.',
      en: 'Simplify the ratio 9 : 27.'
    },
    options: ['1 : 3', '3 : 1', '1 : 9'],
    correctIndex: 0,
    explanation: {
      ms: 'FSTB bagi 9 dan 27 ialah 9. Bahagikan kedua-dua sebutan dengan 9: 9 ÷ 9 = 1 dan 27 ÷ 9 = 3. Jawapan: 1 : 3.',
      en: 'HCF of 9 and 27 is 9. Divide both by 9: 9 ÷ 9 = 1 and 27 ÷ 9 = 3. Answer: 1 : 3.'
    }
  },
  {
    id: 'e16',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Terdapat 12 helai baju biru dan 16 helai baju putih. Apakah nisbah baju biru kepada baju putih dalam bentuk termudah?',
      en: 'There are 12 blue shirts and 16 white shirts. What is the ratio of blue shirts to white shirts in simplest form?'
    },
    options: ['4 : 3', '3 : 4', '6 : 8'],
    correctIndex: 1,
    explanation: {
      ms: '12 : 16 dipermudahkan dengan membahagi FSTB iaitu 4. 12 ÷ 4 = 3, 16 ÷ 4 = 4. Jawapan: 3 : 4.',
      en: '12 : 16 simplified by dividing by HCF 4 gives 12 ÷ 4 = 3, 16 ÷ 4 = 4. Answer: 3 : 4.'
    }
  },
  {
    id: 'e17',
    difficulty: 'easy',
    dskpCode: '4.1.1',
    question: {
      ms: 'Satu resipi memerlukan 2 cawan tepung, 1 cawan gula dan 3 cawan susu. Apakah nisbah tepung : gula : susu?',
      en: 'A recipe calls for 2 cups of flour, 1 cup of sugar and 3 cups of milk. What is the ratio flour : sugar : milk?'
    },
    options: ['3 : 2 : 1', '2 : 1 : 3', '1 : 2 : 3'],
    correctIndex: 1,
    explanation: {
      ms: 'Tepung = 2, Gula = 1, Susu = 3. Nisbah tepung : gula : susu ialah 2 : 1 : 3.',
      en: 'Flour = 2, Sugar = 1, Milk = 3. The ratio flour : sugar : milk is 2 : 1 : 3.'
    }
  },
  {
    id: 'e18',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Cari nisbah setara bagi 5 : 6 jika sebutan pertamanya ialah 15.',
      en: 'Find the equivalent ratio of 5 : 6 if its first term is 15.'
    },
    options: ['15 : 18', '15 : 16', '15 : 20'],
    correctIndex: 0,
    explanation: {
      ms: '5 didarab dengan 3 menjadi 15. Maka darabkan sebutan kedua juga dengan 3: 6 × 3 = 18. Nisbah setara ialah 15 : 18.',
      en: '5 multiplied by 3 gives 15. Multiply the second term by 3 as well: 6 × 3 = 18. Equivalent ratio is 15 : 18.'
    }
  },
  {
    id: 'e19',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 25 : 35.',
      en: 'Simplify the ratio 25 : 35.'
    },
    options: ['5 : 6', '5 : 7', '7 : 5'],
    correctIndex: 1,
    explanation: {
      ms: 'Bahagikan 25 dan 35 dengan FSTB 5: 25 ÷ 5 = 5 dan 35 ÷ 5 = 7. Jawapan: 5 : 7.',
      en: 'Divide 25 and 35 by HCF 5: 25 ÷ 5 = 5 and 35 ÷ 5 = 7. Answer: 5 : 7.'
    }
  },
  {
    id: 'e20',
    difficulty: 'easy',
    dskpCode: '4.1.1',
    question: {
      ms: 'Tiga bekas A, B, dan C masing-masing mengandungi 6, 9, dan 15 guli. Tulis nisbah A : B : C dalam bentuk termudah.',
      en: 'Three jars A, B, and C contain 6, 9, and 15 marbles respectively. Write the ratio A : B : C in simplest form.'
    },
    options: ['2 : 3 : 5', '3 : 2 : 5', '1 : 3 : 5'],
    correctIndex: 0,
    explanation: {
      ms: 'FSTB bagi 6, 9 dan 15 ialah 3. Bahagikan setiap sebutan dengan 3: 6÷3=2, 9÷3=3, 15÷3=5. Nisbah termudah ialah 2 : 3 : 5.',
      en: 'HCF of 6, 9 and 15 is 3. Divide each term by 3: 6÷3=2, 9÷3=3, 15÷3=5. Simplest form is 2 : 3 : 5.'
    }
  },
  {
    id: 'e21',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 16 : 20.',
      en: 'Simplify the ratio 16 : 20.'
    },
    options: ['4 : 5', '5 : 4', '2 : 5'],
    correctIndex: 0,
    explanation: {
      ms: 'FSTB bagi 16 dan 20 ialah 4. 16 ÷ 4 = 4 dan 20 ÷ 4 = 5. Bentuk termudah ialah 4 : 5.',
      en: 'HCF of 16 and 20 is 4. 16 ÷ 4 = 4 and 20 ÷ 4 = 5. Simplest form is 4 : 5.'
    }
  },
  {
    id: 'e22',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Antara berikut, nisbah manakah yang setara dengan 4 : 7?',
      en: 'Which of the following ratios is equivalent to 4 : 7?'
    },
    options: ['8 : 12', '8 : 14', '12 : 20'],
    correctIndex: 1,
    explanation: {
      ms: 'Darabkan 4 dan 7 dengan 2: 4 × 2 = 8, 7 × 2 = 14. Maka 8 : 14 adalah setara dengan 4 : 7.',
      en: 'Multiply 4 and 7 by 2: 4 × 2 = 8, 7 × 2 = 14. Hence 8 : 14 is equivalent to 4 : 7.'
    }
  },
  {
    id: 'e23',
    difficulty: 'easy',
    dskpCode: '4.1.2',
    question: {
      ms: 'Sebuah tangki mengandungi 30 liter air petrol dan 50 liter diesel. Cari nisbah petrol kepada diesel dalam bentuk termudah.',
      en: 'A tank holds 30 liters of petrol and 50 liters of diesel. Find the ratio of petrol to diesel in simplest form.'
    },
    options: ['3 : 5', '5 : 3', '3 : 8'],
    correctIndex: 0,
    explanation: {
      ms: 'Nisbah petrol : diesel = 30 : 50. Bahagikan kedua-duanya dengan 10: 30 ÷ 10 = 3, 50 ÷ 10 = 5. Jawapan: 3 : 5.',
      en: 'Ratio petrol : diesel = 30 : 50. Divide both by 10: 30 ÷ 10 = 3, 50 ÷ 10 = 5. Answer: 3 : 5.'
    }
  },

  // ==========================================
  // MEDIUM: SKY NAVIGATOR (22 Questions)
  // Focus: 4.1.2 equivalent ratios & simplifying larger numbers, 4.1.1 three quantities with simplification, 4.1.3 simple ratio combinations
  // ==========================================
  {
    id: 'm1',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi A : B = 2 : 3 dan B : C = 3 : 4. Tentukan nisbah A : B : C.',
      en: 'Given A : B = 2 : 3 and B : C = 3 : 4. Determine the ratio A : B : C.'
    },
    options: ['2 : 3 : 4', '2 : 4 : 3', '3 : 2 : 4'],
    correctIndex: 0,
    explanation: {
      ms: 'Nilai sebutan sepunya B bagi kedua-dua nisbah adalah sama iaitu 3. Oleh itu, kita boleh terus menggabungkannya: A : B : C = 2 : 3 : 4.',
      en: 'The common term B has the identical value 3 in both ratios. Thus, we can directly combine them: A : B : C = 2 : 3 : 4.'
    }
  },
  {
    id: 'm2',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi x : y = 1 : 2 dan y : z = 2 : 5. Cari nisbah x : y : z.',
      en: 'Given x : y = 1 : 2 and y : z = 2 : 5. Find the ratio x : y : z.'
    },
    options: ['1 : 5 : 2', '1 : 2 : 5', '2 : 1 : 5'],
    correctIndex: 1,
    explanation: {
      ms: 'Sebutan sepunya y bernilai 2 dalam kedua-dua nisbah. Maka cantumkan secara langsung: x : y : z = 1 : 2 : 5.',
      en: 'The shared term y is 2 in both ratios. Directly combine: x : y : z = 1 : 2 : 5.'
    }
  },
  {
    id: 'm3',
    difficulty: 'medium',
    dskpCode: '4.1.1',
    question: {
      ms: 'Sebuah hangar mempunyai 10 pesawat kecil, 15 pesawat sederhana dan 20 pesawat besar. Apakah nisbah dalam bentuk termudah?',
      en: 'A hangar has 10 small planes, 15 medium planes and 20 large planes. What is the ratio in simplest form?'
    },
    options: ['2 : 3 : 4', '3 : 2 : 4', '1 : 3 : 2'],
    correctIndex: 0,
    explanation: {
      ms: 'Nisbah = 10 : 15 : 20. FSTB bagi 10, 15 dan 20 ialah 5. Bahagikan setiap nombor dengan 5: 10÷5=2, 15÷5=3, 20÷5=4. Jawapan: 2 : 3 : 4.',
      en: 'Ratio = 10 : 15 : 20. HCF is 5. Divide each term by 5: 10÷5=2, 15÷5=3, 20÷5=4. Answer: 2 : 3 : 4.'
    }
  },
  {
    id: 'm4',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Nisbah 36 : 48 apabila dipermudahkan kepada sebutan terendah ialah:',
      en: 'The ratio 36 : 48 simplified to lowest terms is:'
    },
    options: ['4 : 3', '3 : 4', '6 : 8'],
    correctIndex: 1,
    explanation: {
      ms: 'FSTB bagi 36 dan 48 ialah 12. 36 ÷ 12 = 3 dan 48 ÷ 12 = 4. Bentuk termudah ialah 3 : 4.',
      en: 'HCF of 36 and 48 is 12. 36 ÷ 12 = 3 and 48 ÷ 12 = 4. Simplest form is 3 : 4.'
    }
  },
  {
    id: 'm5',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi p : q = 3 : 4 dan q : r = 4 : 7. Apakah nisbah p : q : r?',
      en: 'Given p : q = 3 : 4 and q : r = 4 : 7. What is the ratio p : q : r?'
    },
    options: ['3 : 7 : 4', '3 : 4 : 7', '4 : 3 : 7'],
    correctIndex: 1,
    explanation: {
      ms: 'Nilai q bagi kedua-dua nisbah ialah 4. Gabungkan sebutan: p : q : r = 3 : 4 : 7.',
      en: 'Value of q in both ratios is 4. Combine directly: p : q : r = 3 : 4 : 7.'
    }
  },
  {
    id: 'm6',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Diberi nisbah 4 : 9. Jika sebutan kedua menjadi 45, apakah sebutan pertama bagi nisbah setara itu?',
      en: 'Given the ratio 4 : 9. If the second term becomes 45, what is the first term of this equivalent ratio?'
    },
    options: ['18', '20', '24'],
    correctIndex: 1,
    explanation: {
      ms: '9 didarab dengan 5 untuk menghasilkan 45 (45 ÷ 9 = 5). Maka sebutan pertama mestilah didarab dengan 5 juga: 4 × 5 = 20. Nisbah setara ialah 20 : 45.',
      en: '9 is multiplied by 5 to get 45 (45 ÷ 9 = 5). So multiply the first term by 5 as well: 4 × 5 = 20. Equivalent ratio is 20 : 45.'
    }
  },
  {
    id: 'm7',
    difficulty: 'medium',
    dskpCode: '4.1.1',
    question: {
      ms: 'Panjang tiga utas tali ialah 12 cm, 18 cm, dan 30 cm. Permudahkan nisbah panjang ketiga-tiga tali itu.',
      en: 'The lengths of three ropes are 12 cm, 18 cm, and 30 cm. Simplify the ratio of the lengths of the three ropes.'
    },
    options: ['2 : 3 : 5', '2 : 3 : 6', '4 : 6 : 10'],
    correctIndex: 0,
    explanation: {
      ms: 'FSTB bagi 12, 18 dan 30 ialah 6. Bahagikan setiap nombor dengan 6: 12÷6=2, 18÷6=3, 30÷6=5. Nisbah termudah ialah 2 : 3 : 5.',
      en: 'HCF of 12, 18, and 30 is 6. Divide each term by 6: 12÷6=2, 18÷6=3, 30÷6=5. Simplest form is 2 : 3 : 5.'
    }
  },
  {
    id: 'm8',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi m : n = 2 : 3 dan n : p = 6 : 5. Tentukan nisbah m : n : p.',
      en: 'Given m : n = 2 : 3 and n : p = 6 : 5. Determine the ratio m : n : p.'
    },
    options: ['4 : 6 : 5', '2 : 6 : 5', '4 : 5 : 6'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya n bernilai 3 dalam nisbah pertama dan 6 dalam nisbah kedua. Gandaan sepunya terkecil (GSTK) bagi 3 dan 6 ialah 6. Tukarkan nisbah pertama: darab dengan 2 menjadi m : n = (2×2) : (3×2) = 4 : 6. Maka m : n : p = 4 : 6 : 5.',
      en: 'Shared term n is 3 in the first ratio and 6 in the second. LCM of 3 and 6 is 6. Scale the first ratio by 2: m : n = 4 : 6. Now n is aligned, so m : n : p = 4 : 6 : 5.'
    }
  },
  {
    id: 'm9',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Nyatakan nisbah 450 g kepada 1.5 kg dalam bentuk termudah.',
      en: 'Express the ratio of 450 g to 1.5 kg in simplest form.'
    },
    options: ['3 : 10', '3 : 1', '9 : 15'],
    correctIndex: 0,
    explanation: {
      ms: 'Tukarkan unit kepada gram: 1.5 kg = 1500 g. Nisbah = 450 : 1500. FSTB ialah 150. 450 ÷ 150 = 3 dan 1500 ÷ 150 = 10. Nisbah termudah ialah 3 : 10.',
      en: 'Convert units to grams: 1.5 kg = 1500 g. Ratio = 450 : 1500. HCF is 150. 450 ÷ 150 = 3 and 1500 ÷ 150 = 10. Simplest ratio is 3 : 10.'
    }
  },
  {
    id: 'm10',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Antara pasangan nisbah berikut, yang manakah merupakan nisbah setara?',
      en: 'Which pair of ratios are equivalent?'
    },
    options: ['3 : 7 dan 9 : 21', '2 : 5 dan 6 : 12', '4 : 9 dan 8 : 16'],
    correctIndex: 0,
    explanation: {
      ms: 'Bagi 3 : 7, darabkan kedua-dua sebutan dengan 3: 3 × 3 = 9 dan 7 × 3 = 21. Jadi 3 : 7 dan 9 : 21 adalah setara.',
      en: 'For 3 : 7, multiply both terms by 3: 3 × 3 = 9 and 7 × 3 = 21. Therefore 3 : 7 and 9 : 21 are equivalent.'
    }
  },
  {
    id: 'm11',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi u : v = 3 : 2 dan v : w = 4 : 5. Cari nisbah u : v : w.',
      en: 'Given u : v = 3 : 2 and v : w = 4 : 5. Find the ratio u : v : w.'
    },
    options: ['6 : 4 : 5', '3 : 4 : 5', '6 : 5 : 4'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya v bernilai 2 dan 4. Samakan nilai v kepada 4 dengan mendarab nisbah pertama dengan 2: (3×2) : (2×2) = 6 : 4. Maka u : v : w = 6 : 4 : 5.',
      en: 'Shared term v has values 2 and 4. Equalize v to 4 by multiplying first ratio by 2: (3×2) : (2×2) = 6 : 4. Thus u : v : w = 6 : 4 : 5.'
    }
  },
  {
    id: 'm12',
    difficulty: 'medium',
    dskpCode: '4.1.1',
    question: {
      ms: 'Jisim Ali, Bob dan Danial masing-masing ialah 42 kg, 48 kg dan 54 kg. Cari nisbah jisim mereka dalam bentuk termudah.',
      en: 'The masses of Ali, Bob and Danial are 42 kg, 48 kg and 54 kg respectively. Find the ratio of their masses in simplest form.'
    },
    options: ['7 : 8 : 9', '6 : 7 : 8', '7 : 9 : 8'],
    correctIndex: 0,
    explanation: {
      ms: 'FSTB bagi 42, 48 dan 54 ialah 6. 42÷6=7, 48÷6=8, 54÷6=9. Nisbah termudah ialah 7 : 8 : 9.',
      en: 'HCF of 42, 48, and 54 is 6. 42÷6=7, 48÷6=8, 54÷6=9. Simplest ratio is 7 : 8 : 9.'
    }
  },
  {
    id: 'm13',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah pecahan 1/2 : 3/4 kepada nisbah nombor bulat terkecil.',
      en: 'Simplify the fraction ratio 1/2 : 3/4 to the smallest whole number ratio.'
    },
    options: ['2 : 3', '1 : 3', '3 : 2'],
    correctIndex: 0,
    explanation: {
      ms: 'Darabkan kedua-dua sebutan pecahan dengan gandaan sepunya penyebut iaitu 4: (1/2 × 4) : (3/4 × 4) = 2 : 3.',
      en: 'Multiply both fractional terms by common denominator 4: (1/2 × 4) : (3/4 × 4) = 2 : 3.'
    }
  },
  {
    id: 'm14',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah perpuluhan 0.8 : 1.2 kepada bentuk termudah.',
      en: 'Simplify the decimal ratio 0.8 : 1.2 to simplest form.'
    },
    options: ['2 : 3', '4 : 5', '8 : 12'],
    correctIndex: 0,
    explanation: {
      ms: 'Darabkan kedua-duanya dengan 10 untuk menghapuskan perpuluhan: 8 : 12. Kemudian bahagikan dengan FSTB 4: 8 ÷ 4 = 2 dan 12 ÷ 4 = 3. Jawapan: 2 : 3.',
      en: 'Multiply both by 10: 8 : 12. Then divide by HCF 4: 8 ÷ 4 = 2 and 12 ÷ 4 = 3. Answer: 2 : 3.'
    }
  },
  {
    id: 'm15',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi p : q = 1 : 3 dan q : r = 6 : 7. Apakah nisbah p : q : r?',
      en: 'Given p : q = 1 : 3 and q : r = 6 : 7. What is the ratio p : q : r?'
    },
    options: ['2 : 6 : 7', '1 : 6 : 7', '2 : 3 : 7'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya q bernilai 3 dan 6. Samakan q kepada 6 dengan mendarab nisbah pertama dengan 2: (1×2) : (3×2) = 2 : 6. Gabungkan: p : q : r = 2 : 6 : 7.',
      en: 'Shared term q is 3 and 6. Scale first ratio by 2: (1×2) : (3×2) = 2 : 6. Combine: p : q : r = 2 : 6 : 7.'
    }
  },
  {
    id: 'm16',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Dalam sebuah kelab penerbangan, nisbah juruterbang lelaki kepada wanita ialah 5 : 3. Jika terdapat 25 juruterbang lelaki, berapakah bilangan juruterbang wanita?',
      en: 'In a flight club, the ratio of male to female pilots is 5 : 3. If there are 25 male pilots, how many female pilots are there?'
    },
    options: ['12', '15', '18'],
    correctIndex: 1,
    explanation: {
      ms: '5 bahagian mewakili 25 juruterbang. Maka 1 bahagian = 25 ÷ 5 = 5. Bilangan juruterbang wanita = 3 bahagian × 5 = 15 orang.',
      en: '5 parts represent 25 pilots. 1 part = 25 ÷ 5 = 5. Female pilots = 3 parts × 5 = 15.'
    }
  },
  {
    id: 'm17',
    difficulty: 'medium',
    dskpCode: '4.1.1',
    question: {
      ms: 'Sebuah taman bunga mempunyai 24 kuntum mawar, 36 kekwa dan 48 orkid. Tulis nisbah mawar : kekwa : orkid dalam bentuk termudah.',
      en: 'A garden has 24 roses, 36 chrysanthemums and 48 orchids. Write the ratio roses : chrysanthemums : orchids in simplest form.'
    },
    options: ['2 : 3 : 4', '3 : 4 : 5', '1 : 2 : 3'],
    correctIndex: 0,
    explanation: {
      ms: 'FSTB bagi 24, 36 dan 48 ialah 12. 24 ÷ 12 = 2, 36 ÷ 12 = 3, 48 ÷ 12 = 4. Nisbah termudah ialah 2 : 3 : 4.',
      en: 'HCF of 24, 36, and 48 is 12. 24 ÷ 12 = 2, 36 ÷ 12 = 3, 48 ÷ 12 = 4. Simplest ratio is 2 : 3 : 4.'
    }
  },
  {
    id: 'm18',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi X : Y = 4 : 5 dan Y : Z = 15 : 8. Tentukan nisbah X : Y : Z.',
      en: 'Given X : Y = 4 : 5 and Y : Z = 15 : 8. Determine the ratio X : Y : Z.'
    },
    options: ['12 : 15 : 8', '4 : 15 : 8', '8 : 15 : 8'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya Y ialah 5 dan 15. Darabkan nisbah pertama dengan 3 supaya Y menjadi 15: (4×3) : (5×3) = 12 : 15. Maka X : Y : Z = 12 : 15 : 8.',
      en: 'Common term Y is 5 and 15. Multiply first ratio by 3: (4×3) : (5×3) = 12 : 15. Thus X : Y : Z = 12 : 15 : 8.'
    }
  },
  {
    id: 'm19',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah 54 : 72.',
      en: 'Simplify the ratio 54 : 72.'
    },
    options: ['3 : 4', '2 : 3', '6 : 8'],
    correctIndex: 0,
    explanation: {
      ms: 'FSTB bagi 54 dan 72 ialah 18. 54 ÷ 18 = 3 dan 72 ÷ 18 = 4. Jawapan: 3 : 4.',
      en: 'HCF of 54 and 72 is 18. 54 ÷ 18 = 3 and 72 ÷ 18 = 4. Answer: 3 : 4.'
    }
  },
  {
    id: 'm20',
    difficulty: 'medium',
    dskpCode: '4.1.2',
    question: {
      ms: 'Nisbah masa rehat kepada masa belajar Farid ialah 1 : 4. Jika dia belajar selama 120 minit, berapa minitkah masa rehatnya?',
      en: 'The ratio of Farid’s break time to study time is 1 : 4. If he studied for 120 minutes, how many minutes was his break?'
    },
    options: ['25 minit', '30 minit', '40 minit'],
    correctIndex: 1,
    explanation: {
      ms: '4 bahagian mewakili 120 minit. Maka 1 bahagian = 120 ÷ 4 = 30 minit. Masa rehat = 30 minit.',
      en: '4 parts represent 120 minutes. So 1 part = 120 ÷ 4 = 30 minutes. Break time = 30 minutes.'
    }
  },
  {
    id: 'm21',
    difficulty: 'medium',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi h : k = 5 : 2 dan k : m = 4 : 9. Cari nisbah h : k : m.',
      en: 'Given h : k = 5 : 2 and k : m = 4 : 9. Find the ratio h : k : m.'
    },
    options: ['10 : 4 : 9', '5 : 4 : 9', '10 : 2 : 9'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya k ialah 2 dan 4. Darabkan nisbah pertama dengan 2: (5×2) : (2×2) = 10 : 4. Maka h : k : m = 10 : 4 : 9.',
      en: 'Common term k is 2 and 4. Multiply first ratio by 2: (5×2) : (2×2) = 10 : 4. Therefore h : k : m = 10 : 4 : 9.'
    }
  },
  {
    id: 'm22',
    difficulty: 'medium',
    dskpCode: '4.1.1',
    question: {
      ms: 'Tiga jenis bahan kimia dicampur dengan nisbah 0.5 : 1.0 : 1.5. Tulis nisbah itu dalam sebutan nombor bulat termudah.',
      en: 'Three chemicals are mixed in the ratio 0.5 : 1.0 : 1.5. Write the ratio in simplest whole numbers.'
    },
    options: ['1 : 2 : 3', '2 : 4 : 6', '1 : 3 : 5'],
    correctIndex: 0,
    explanation: {
      ms: 'Darabkan setiap sebutan dengan 2 (atau darab 10 lalu bahagi 5): 0.5 × 2 = 1, 1.0 × 2 = 2, 1.5 × 2 = 3. Nisbah termudah ialah 1 : 2 : 3.',
      en: 'Multiply each decimal by 2: 0.5 × 2 = 1, 1.0 × 2 = 2, 1.5 × 2 = 3. Simplest whole number ratio is 1 : 2 : 3.'
    }
  },

  // ==========================================
  // HARD: RATIO ACE (22 Questions)
  // Focus: 4.1.3 complex three-quantity combining with LCM, multi-step word problems involving total parts, difference between parts
  // ==========================================
  {
    id: 'h1',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi P : Q = 2 : 5 dan Q : R = 10 : 3. Tentukan nisbah P : Q : R.',
      en: 'Given P : Q = 2 : 5 and Q : R = 10 : 3. Determine the ratio P : Q : R.'
    },
    options: ['4 : 10 : 3', '2 : 5 : 3', '4 : 5 : 10'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya Q mempunyai nilai 5 dan 10. GSTK bagi 5 dan 10 ialah 10. Darabkan nisbah pertama dengan 2: P : Q = (2×2) : (5×2) = 4 : 10. Gabungkan: P : Q : R = 4 : 10 : 3.',
      en: 'Common term Q has values 5 and 10. LCM of 5 and 10 is 10. Multiply first ratio by 2: P : Q = 4 : 10. Combine: P : Q : R = 4 : 10 : 3.'
    }
  },
  {
    id: 'h2',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi a : b = 2 : 3 dan b : c = 4 : 5. Tentukan nisbah a : b : c.',
      en: 'Given a : b = 2 : 3 and b : c = 4 : 5. Determine the ratio a : b : c.'
    },
    options: ['8 : 12 : 15', '2 : 12 : 5', '6 : 12 : 15'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya b bernilai 3 dan 4. GSTK bagi 3 dan 4 ialah 12. Nisbah pertama didarab 4: a : b = 8 : 12. Nisbah kedua didarab 3: b : c = 12 : 15. Maka a : b : c = 8 : 12 : 15.',
      en: 'Common term b has values 3 and 4. LCM is 12. Multiply first ratio by 4: a : b = 8 : 12. Multiply second ratio by 3: b : c = 12 : 15. Result: a : b : c = 8 : 12 : 15.'
    }
  },
  {
    id: 'h3',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi x : y = 3 : 5 dan y : z = 2 : 3. Cari nisbah x : y : z.',
      en: 'Given x : y = 3 : 5 and y : z = 2 : 3. Find the ratio x : y : z.'
    },
    options: ['6 : 10 : 15', '3 : 10 : 3', '6 : 10 : 9'],
    correctIndex: 0,
    explanation: {
      ms: 'GSTK bagi sebutan sepunya y (5 dan 2) ialah 10. Nisbah 1 didarab 2: 6 : 10. Nisbah 2 didarab 5: 10 : 15. Gabungkan: x : y : z = 6 : 10 : 15.',
      en: 'LCM of shared term y (5 and 2) is 10. Multiply first ratio by 2: 6 : 10. Multiply second ratio by 5: 10 : 15. Combine: x : y : z = 6 : 10 : 15.'
    }
  },
  {
    id: 'h4',
    difficulty: 'hard',
    dskpCode: '4.1.2',
    question: {
      ms: 'Nisbah bilangan murid lelaki kepada perempuan dalam satu kelas ialah 3 : 4. Jika jumlah murid ialah 35 orang, cari bilangan murid perempuan.',
      en: 'The ratio of boys to girls in a class is 3 : 4. If the total number of students is 35, find the number of girls.'
    },
    options: ['15', '20', '21'],
    correctIndex: 1,
    explanation: {
      ms: 'Jumlah bahagian = 3 + 4 = 7 bahagian. 7 bahagian = 35 murid, jadi 1 bahagian = 35 ÷ 7 = 5. Murid perempuan = 4 bahagian × 5 = 20 orang.',
      en: 'Total parts = 3 + 4 = 7 parts. 7 parts = 35 students, so 1 part = 35 ÷ 7 = 5. Number of girls = 4 parts × 5 = 20.'
    }
  },
  {
    id: 'h5',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi p : q = 4 : 7 dan q : r = 2 : 3. Apakah nisbah p : q : r?',
      en: 'Given p : q = 4 : 7 and q : r = 2 : 3. What is the ratio p : q : r?'
    },
    options: ['8 : 14 : 21', '8 : 14 : 18', '4 : 14 : 21'],
    correctIndex: 0,
    explanation: {
      ms: 'GSTK bagi 7 dan 2 ialah 14. Nisbah pertama didarab 2: p : q = 8 : 14. Nisbah kedua didarab 7: q : r = 14 : 21. Gabungkan: p : q : r = 8 : 14 : 21.',
      en: 'LCM of 7 and 2 is 14. First ratio × 2: p : q = 8 : 14. Second ratio × 7: q : r = 14 : 21. Combine: p : q : r = 8 : 14 : 21.'
    }
  },
  {
    id: 'h6',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi j : k = 5 : 3 dan k : L = 6 : 7. Cari nisbah j : k : L.',
      en: 'Given j : k = 5 : 3 and k : L = 6 : 7. Find the ratio j : k : L.'
    },
    options: ['10 : 6 : 7', '5 : 6 : 7', '10 : 3 : 7'],
    correctIndex: 0,
    explanation: {
      ms: 'GSTK bagi sebutan sepunya k (3 dan 6) ialah 6. Darabkan nisbah pertama dengan 2: (5×2) : (3×2) = 10 : 6. Gabungkan dengan k : L = 6 : 7. Hasil: 10 : 6 : 7.',
      en: 'LCM of shared term k (3 and 6) is 6. Multiply first ratio by 2: (5×2) : (3×2) = 10 : 6. Combine with k : L = 6 : 7. Result: 10 : 6 : 7.'
    }
  },
  {
    id: 'h7',
    difficulty: 'hard',
    dskpCode: '4.1.1',
    question: {
      ms: 'Seutas dawai berpanjang 72 cm dipotong kepada tiga bahagian dengan nisbah 2 : 3 : 4. Berapakah panjang bahagian yang paling panjang?',
      en: 'A wire of length 72 cm is cut into three pieces in the ratio 2 : 3 : 4. What is the length of the longest piece?'
    },
    options: ['24 cm', '32 cm', '36 cm'],
    correctIndex: 1,
    explanation: {
      ms: 'Jumlah bahagian = 2 + 3 + 4 = 9 bahagian. 1 bahagian = 72 ÷ 9 = 8 cm. Bahagian paling panjang ialah 4 bahagian: 4 × 8 cm = 32 cm.',
      en: 'Total parts = 2 + 3 + 4 = 9 parts. 1 part = 72 ÷ 9 = 8 cm. Longest piece has 4 parts: 4 × 8 cm = 32 cm.'
    }
  },
  {
    id: 'h8',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi s : t = 3 : 4 dan s : u = 6 : 5. Tentukan nisbah s : t : u.',
      en: 'Given s : t = 3 : 4 and s : u = 6 : 5. Determine the ratio s : t : u.'
    },
    options: ['6 : 8 : 5', '6 : 4 : 5', '3 : 8 : 5'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya di sini ialah s (iaitu 3 dan 6). Samakan nilai s kepada 6 dengan mendarab nisbah s : t dengan 2: s : t = 6 : 8. Kerana s : u = 6 : 5, maka s : t : u = 6 : 8 : 5.',
      en: 'Common term here is s (values 3 and 6). Scale s : t by 2: s : t = 6 : 8. Since s : u = 6 : 5, then s : t : u = 6 : 8 : 5.'
    }
  },
  {
    id: 'h9',
    difficulty: 'hard',
    dskpCode: '4.1.2',
    question: {
      ms: 'Nisbah wang simpanan Dania kepada Sarah ialah 4 : 7. Beza wang simpanan mereka ialah RM90. Berapakah jumlah wang simpanan Dania?',
      en: 'The ratio of Dania’s savings to Sarah’s is 4 : 7. The difference between their savings is RM90. How much is Dania’s savings?'
    },
    options: ['RM120', 'RM150', 'RM210'],
    correctIndex: 0,
    explanation: {
      ms: 'Beza bahagian = 7 - 4 = 3 bahagian. 3 bahagian = RM90, jadi 1 bahagian = RM90 ÷ 3 = RM30. Simpanan Dania = 4 bahagian × RM30 = RM120.',
      en: 'Difference in parts = 7 - 4 = 3 parts. 3 parts = RM90, so 1 part = RM90 ÷ 3 = RM30. Dania’s savings = 4 parts × RM30 = RM120.'
    }
  },
  {
    id: 'h10',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi m : n = 3 : 8 dan n : p = 6 : 5. Cari nisbah m : n : p dalam bentuk termudah.',
      en: 'Given m : n = 3 : 8 and n : p = 6 : 5. Find the ratio m : n : p in simplest form.'
    },
    options: ['9 : 24 : 20', '9 : 24 : 15', '6 : 24 : 20'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya n mempunyai nilai 8 dan 6. GSTK bagi 8 dan 6 ialah 24. Nisbah pertama didarab 3: (3×3) : (8×3) = 9 : 24. Nisbah kedua didarab 4: (6×4) : (5×4) = 24 : 20. Hasil: 9 : 24 : 20.',
      en: 'Common term n is 8 and 6. LCM of 8 and 6 is 24. First ratio × 3: 9 : 24. Second ratio × 4: 24 : 20. Result: 9 : 24 : 20.'
    }
  },
  {
    id: 'h11',
    difficulty: 'hard',
    dskpCode: '4.1.1',
    question: {
      ms: 'Nisbah sudut bagi sebuah segi tiga ialah 1 : 2 : 3. Cari nilai sudut yang terbesar (Jumlah sudut segi tiga = 180°).',
      en: 'The ratio of the angles in a triangle is 1 : 2 : 3. Find the value of the largest angle (Total angles of triangle = 180°).'
    },
    options: ['60°', '90°', '120°'],
    correctIndex: 1,
    explanation: {
      ms: 'Jumlah bahagian = 1 + 2 + 3 = 6 bahagian. 1 bahagian = 180° ÷ 6 = 30°. Sudut terbesar ialah 3 bahagian: 3 × 30° = 90°.',
      en: 'Total parts = 1 + 2 + 3 = 6 parts. 1 part = 180° ÷ 6 = 30°. The largest angle has 3 parts: 3 × 30° = 90°.'
    }
  },
  {
    id: 'h12',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi p : q = 2 : 3 dan p : r = 3 : 5. Cari nisbah p : q : r.',
      en: 'Given p : q = 2 : 3 and p : r = 3 : 5. Find the ratio p : q : r.'
    },
    options: ['6 : 9 : 10', '6 : 6 : 10', '6 : 9 : 15'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya p ialah 2 dan 3. GSTK ialah 6. Darab nisbah pertama dengan 3: p : q = 6 : 9. Darab nisbah kedua dengan 2: p : r = 6 : 10. Gabungkan: p : q : r = 6 : 9 : 10.',
      en: 'Common term p has values 2 and 3. LCM is 6. Multiply first ratio by 3: p : q = 6 : 9. Multiply second ratio by 2: p : r = 6 : 10. Combined: p : q : r = 6 : 9 : 10.'
    }
  },
  {
    id: 'h13',
    difficulty: 'hard',
    dskpCode: '4.1.2',
    question: {
      ms: 'Permudahkan nisbah pecahan 2/3 : 5/6 : 1/2 kepada bentuk nombor bulat termudah.',
      en: 'Simplify the fraction ratio 2/3 : 5/6 : 1/2 to simplest whole numbers.'
    },
    options: ['4 : 5 : 3', '2 : 5 : 1', '4 : 5 : 6'],
    correctIndex: 0,
    explanation: {
      ms: 'Penyebut ialah 3, 6, dan 2. GSTK penyebut ialah 6. Darabkan setiap sebutan dengan 6: (2/3×6) = 4, (5/6×6) = 5, (1/2×6) = 3. Nisbah: 4 : 5 : 3.',
      en: 'Denominators are 3, 6, and 2. LCM is 6. Multiply each term by 6: (2/3×6) = 4, (5/6×6) = 5, (1/2×6) = 3. Ratio: 4 : 5 : 3.'
    }
  },
  {
    id: 'h14',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi x : y = 5 : 4 dan y : z = 6 : 7. Apakah nisbah x : y : z?',
      en: 'Given x : y = 5 : 4 and y : z = 6 : 7. What is the ratio x : y : z?'
    },
    options: ['15 : 12 : 14', '15 : 12 : 21', '30 : 24 : 14'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya y bernilai 4 dan 6. GSTK bagi 4 dan 6 ialah 12. Darabkan nisbah pertama dengan 3: 15 : 12. Darabkan nisbah kedua dengan 2: 12 : 14. Hasil: 15 : 12 : 14.',
      en: 'Shared term y is 4 and 6. LCM is 12. Multiply first ratio by 3: 15 : 12. Multiply second ratio by 2: 12 : 14. Result: 15 : 12 : 14.'
    }
  },
  {
    id: 'h15',
    difficulty: 'hard',
    dskpCode: '4.1.1',
    question: {
      ms: 'Nisbah wang simpanan Ahmad, Bala dan Chong ialah 2 : 5 : 7. Jika Chong mempunyai RM280 lebih daripada Ahmad, berapa wang Bala?',
      en: 'The ratio of savings of Ahmad, Bala and Chong is 2 : 5 : 7. If Chong has RM280 more than Ahmad, how much does Bala have?'
    },
    options: ['RM240', 'RM280', 'RM350'],
    correctIndex: 1,
    explanation: {
      ms: 'Beza bahagian Chong dan Ahmad = 7 - 2 = 5 bahagian. 5 bahagian = RM280, maka 1 bahagian = RM280 ÷ 5 = RM56. Wang Bala = 5 bahagian × RM56 = RM280.',
      en: 'Difference between Chong and Ahmad = 7 - 2 = 5 parts. 5 parts = RM280, so 1 part = RM280 ÷ 5 = RM56. Bala’s money = 5 parts × RM56 = RM280.'
    }
  },
  {
    id: 'h16',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi A : B = 3 : 7 dan B : C = 14 : 9. Cari nisbah A : B : C.',
      en: 'Given A : B = 3 : 7 and B : C = 14 : 9. Find the ratio A : B : C.'
    },
    options: ['6 : 14 : 9', '3 : 14 : 9', '6 : 7 : 9'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya B bernilai 7 dan 14. Samakan B kepada 14 dengan mendarab nisbah pertama dengan 2: (3×2) : (7×2) = 6 : 14. Gabungkan: A : B : C = 6 : 14 : 9.',
      en: 'Common term B is 7 and 14. Scale first ratio by 2: (3×2) : (7×2) = 6 : 14. Combine: A : B : C = 6 : 14 : 9.'
    }
  },
  {
    id: 'h17',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi p : q = 7 : 4 dan q : r = 8 : 5. Apakah nisbah p : q : r?',
      en: 'Given p : q = 7 : 4 and q : r = 8 : 5. What is the ratio p : q : r?'
    },
    options: ['14 : 8 : 5', '7 : 8 : 5', '14 : 4 : 5'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya q ialah 4 dan 8. Darabkan nisbah pertama dengan 2: (7×2) : (4×2) = 14 : 8. Gabungkan dengan q : r = 8 : 5. Hasil: 14 : 8 : 5.',
      en: 'Common term q is 4 and 8. Multiply first ratio by 2: (7×2) : (4×2) = 14 : 8. Combine with q : r = 8 : 5. Result: 14 : 8 : 5.'
    }
  },
  {
    id: 'h18',
    difficulty: 'hard',
    dskpCode: '4.1.2',
    question: {
      ms: 'Nisbah panjang kepada lebar sebuah gelanggang badminton ialah 13 : 6. Jika perimeter gelanggang ialah 76 m, cari panjang gelanggang itu.',
      en: 'The ratio of length to width of a badminton court is 13 : 6. If the perimeter is 76 m, find the length of the court.'
    },
    options: ['24 m', '26 m', '28 m'],
    correctIndex: 1,
    explanation: {
      ms: 'Perimeter = 2 × (panjang + lebar) = 76 m. Maka (panjang + lebar) = 38 m. Jumlah bahagian = 13 + 6 = 19 bahagian. 1 bahagian = 38 ÷ 19 = 2 m. Panjang = 13 × 2 m = 26 m.',
      en: 'Perimeter = 2 × (length + width) = 76 m. So (length + width) = 38 m. Total parts = 13 + 6 = 19 parts. 1 part = 38 ÷ 19 = 2 m. Length = 13 × 2 m = 26 m.'
    }
  },
  {
    id: 'h19',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi u : v = 4 : 9 dan v : w = 3 : 2. Cari nisbah u : v : w dalam bentuk termudah.',
      en: 'Given u : v = 4 : 9 and v : w = 3 : 2. Find the ratio u : v : w in simplest form.'
    },
    options: ['4 : 9 : 6', '4 : 9 : 2', '12 : 9 : 6'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya v bernilai 9 dan 3. Darabkan nisbah kedua dengan 3: (3×3) : (2×3) = 9 : 6. Sekarang v sepadan iaitu 9. Maka u : v : w = 4 : 9 : 6.',
      en: 'Common term v is 9 and 3. Multiply second ratio by 3: (3×3) : (2×3) = 9 : 6. Now v is 9 in both. So u : v : w = 4 : 9 : 6.'
    }
  },
  {
    id: 'h20',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi x : y = 2 : 5 dan x : z = 3 : 4. Tentukan nisbah x : y : z.',
      en: 'Given x : y = 2 : 5 and x : z = 3 : 4. Determine the ratio x : y : z.'
    },
    options: ['6 : 15 : 8', '6 : 10 : 8', '6 : 15 : 12'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya ialah x (nilai 2 dan 3). GSTK bagi 2 dan 3 ialah 6. Nisbah 1 didarab 3: x : y = 6 : 15. Nisbah 2 didarab 2: x : z = 6 : 8. Gabungkan: x : y : z = 6 : 15 : 8.',
      en: 'Shared term is x (values 2 and 3). LCM is 6. Multiply first ratio by 3: x : y = 6 : 15. Multiply second ratio by 2: x : z = 6 : 8. Combine: x : y : z = 6 : 15 : 8.'
    }
  },
  {
    id: 'h21',
    difficulty: 'hard',
    dskpCode: '4.1.2',
    question: {
      ms: 'Tiga nombor mempunyai nisbah 3 : 4 : 5. Jika hasil tambah ketiga-tiga nombor tersebut ialah 144, apakah nombor yang terkecil?',
      en: 'Three numbers have the ratio 3 : 4 : 5. If the sum of all three numbers is 144, what is the smallest number?'
    },
    options: ['32', '36', '40'],
    correctIndex: 1,
    explanation: {
      ms: 'Jumlah bahagian = 3 + 4 + 5 = 12 bahagian. 1 bahagian = 144 ÷ 12 = 12. Nombor terkecil mempunyai 3 bahagian: 3 × 12 = 36.',
      en: 'Total parts = 3 + 4 + 5 = 12 parts. 1 part = 144 ÷ 12 = 12. Smallest number has 3 parts: 3 × 12 = 36.'
    }
  },
  {
    id: 'h22',
    difficulty: 'hard',
    dskpCode: '4.1.3',
    question: {
      ms: 'Diberi k : m = 4 : 7 dan m : n = 2 : 3. Tentukan nisbah k : m : n.',
      en: 'Given k : m = 4 : 7 and m : n = 2 : 3. Determine the ratio k : m : n.'
    },
    options: ['8 : 14 : 21', '8 : 14 : 12', '4 : 14 : 21'],
    correctIndex: 0,
    explanation: {
      ms: 'Sebutan sepunya m ialah 7 dan 2. GSTK ialah 14. Nisbah pertama didarab 2: k : m = 8 : 14. Nisbah kedua didarab 7: m : n = 14 : 21. Gabungkan: k : m : n = 8 : 14 : 21.',
      en: 'Common term m is 7 and 2. LCM is 14. First ratio × 2: 8 : 14. Second ratio × 7: 14 : 21. Combined: k : m : n = 8 : 14 : 21.'
    }
  }
];

export function getQuestionsByDifficulty(diff: 'easy' | 'medium' | 'hard'): RatioQuestion[] {
  return QUESTION_BANK.filter(q => q.difficulty === diff);
}

export function getQuestionsForStage(stage: StageId): RatioQuestion[] {
  if (stage === 1) {
    return QUESTION_BANK.filter(q => q.difficulty === 'easy');
  } else if (stage === 2) {
    return QUESTION_BANK.filter(q => q.difficulty === 'medium');
  } else {
    return QUESTION_BANK.filter(q => q.difficulty === 'hard');
  }
}

