import blog1 from "@/assets/blog-1.avif";
import blog2 from "@/assets/blog-2.avif";
import blog3 from "@/assets/blog-3.avif";
import blog4 from "@/assets/blog-4.avif";
import blog5 from "@/assets/blog-5.avif";
import blog6 from "@/assets/blog-6.avif";
import blog7 from "@/assets/blog-7.avif";
import blog8 from "@/assets/blog-8.avif";

import type { Language } from "@/i18n/types";

export interface BlogPost {
  slug: string;
  date: string;
  image: string;
  translations: Record<Language, {
    title: string;
    metaDescription: string;
    category: string;
    readTime: string;
    excerpt: string;
    content: string;
  }>;
}

export const blogCategories: Record<Language, string[]> = {
  de: ["Alle", "Behandlungen", "Prävention", "Wissen", "Krankenkasse"],
  en: ["All", "Treatments", "Prevention", "Knowledge", "Insurance"],
  ru: ["Все", "Процедуры", "Профилактика", "Знания", "Страховка"],
};

export const blogPosts: BlogPost[] = [
  {
    slug: "was-ist-podologie",
    date: "2026-01-15",
    image: blog1,
    translations: {
      de: {
        title: "Was ist Podologie? – Alles über die medizinische Fußpflege",
        metaDescription:
          "Was genau macht ein Podologe? Erfahren Sie den Unterschied zur kosmetischen Fußpflege und wann Sie einen Podologen aufsuchen sollten.",
        category: "Wissen",
        readTime: "5 Min.",
        excerpt:
          "Podologie ist weit mehr als Fußpflege. Als medizinischer Fachberuf widmet sie sich der Prävention, Erkennung und Behandlung von Fußerkrankungen.",
        content: `## Was ist Podologie?

Podologie ist die nichtärztliche Heilkunde am Fuß. Der Begriff stammt aus dem Griechischen: „podos" (Fuß) und „logos" (Lehre). Seit 2002 ist Podologie in Deutschland ein geschützter Gesundheitsfachberuf, geregelt durch das Podologengesetz (PodG).

## Der Unterschied zur kosmetischen Fußpflege

Während die kosmetische Fußpflege sich auf Pflege und Ästhetik konzentriert, behandeln Podologen medizinische Fußprobleme. Dazu gehören:

- **Eingewachsene Nägel** – professionelle Korrektur und Spangentherapie
- **Diabetisches Fußsyndrom** – spezielle Versorgung bei Nervenschäden
- **Hornhaut und Hühneraugen** – medizinische Abtragung
- **Warzen** – Behandlung mittels Kryotherapie
- **Nageldeformitäten** – Orthonyxie und Nagelprothetik

## Wann zum Podologen?

Einen Podologen sollten Sie aufsuchen bei:

1. Schmerzen beim Gehen
2. Eingewachsenen oder verformten Nägeln
3. Diabetes mit Fußproblemen
4. Hartnäckigen Hühneraugen oder Warzen
5. Chronischen Wunden am Fuß

## Kostenübernahme

Bei medizinischer Notwendigkeit übernehmen die gesetzlichen Krankenkassen die Kosten für podologische Behandlungen. Ihr Hausarzt oder Diabetologe kann eine Verordnung (Heilmittelverordnung) ausstellen. Unsere Praxis ist kassenzugelassen.`,
      },
      en: {
        title: "What Is Podology? – Everything About Medical Foot Care",
        metaDescription:
          "What exactly does a podiatrist do? Learn the difference from cosmetic pedicure and when you should see a podiatrist.",
        category: "Knowledge",
        readTime: "5 min.",
        excerpt:
          "Podology is much more than foot care. As a medical profession, it is dedicated to the prevention, detection, and treatment of foot conditions.",
        content: `## What Is Podology?

Podology is non-physician medical care of the foot. The term comes from the Greek: "podos" (foot) and "logos" (study). Since 2002, podology has been a protected healthcare profession in Germany, regulated by the Podiatry Act (PodG).

## The Difference From Cosmetic Foot Care

While cosmetic foot care focuses on grooming and aesthetics, podiatrists treat medical foot problems. These include:

- **Ingrown toenails** – professional correction and brace therapy
- **Diabetic foot syndrome** – specialized care for nerve damage
- **Calluses and corns** – medical removal
- **Warts** – treatment using cryotherapy
- **Nail deformities** – orthonyxia and nail prosthetics

## When Should You See a Podiatrist?

You should visit a podiatrist if you experience:

1. Pain while walking
2. Ingrown or deformed nails
3. Diabetes with foot problems
4. Persistent corns or warts
5. Chronic wounds on the foot

## Cost Coverage

If medically necessary, statutory health insurance covers the costs of podological treatments. Your general practitioner or diabetologist can issue a prescription (therapeutic prescription). Our practice is approved by health insurance providers.`,
      },
      ru: {
        title: "Что такое подология? – Всё о медицинском уходе за стопами",
        metaDescription:
          "Чем именно занимается подолог? Узнайте, чем подология отличается от косметического педикюра и когда стоит обратиться к подологу.",
        category: "Знания",
        readTime: "5 мин.",
        excerpt:
          "Подология — это гораздо больше, чем уход за ногами. Как медицинская специальность, она занимается профилактикой, диагностикой и лечением заболеваний стоп.",
        content: `## Что такое подология?

Подология — это нефизикальная медицинская помощь для стоп. Термин происходит из греческого: «podos» (стопа) и «logos» (учение). С 2002 года подология является защищённой медицинской профессией в Германии, регулируемой Законом о подологах (PodG).

## Отличие от косметического ухода за ногами

В то время как косметический уход за ногами сосредоточен на уходе и эстетике, подологи лечат медицинские проблемы стоп. К ним относятся:

- **Вросшие ногти** – профессиональная коррекция и скобяная терапия
- **Диабетическая стопа** – специализированный уход при повреждении нервов
- **Мозоли и натоптыши** – медицинское удаление
- **Бородавки** – лечение методом криотерапии
- **Деформация ногтей** – ортониксия и протезирование ногтей

## Когда следует обратиться к подологу?

Вам следует обратиться к подологу при:

1. Боли при ходьбе
2. Вросших или деформированных ногтях
3. Диабете с проблемами стоп
4. Стойких мозолях или бородавках
5. Хронических ранах на стопе

## Покрытие расходов

При медицинской необходимости расходы на подологическое лечение покрывает обязательное медицинское страхование. Ваш семейный врач или диабетолог может выписать направление (рецепт на лечебные средства). Наша практика имеет допуск к работе с больничными кассами.`,
      },
    },
  },
  {
    slug: "nagelpilz-erkennen-behandeln",
    date: "2026-01-28",
    image: blog2,
    translations: {
      de: {
        title: "Nagelpilz erkennen und behandeln – Was wirklich hilft",
        metaDescription:
          "Nagelpilz am Fuß? Erfahren Sie, wie Sie Nagelpilz frühzeitig erkennen und welche Behandlungsmethoden wirklich helfen.",
        category: "Behandlungen",
        readTime: "6 Min.",
        excerpt:
          "Nagelpilz betrifft jeden fünften Erwachsenen. Frühzeitig erkannt, lässt er sich gut behandeln – mit der richtigen Methode.",
        content: `## Nagelpilz erkennen

Nagelpilz (Onychomykose) zeigt sich typischerweise durch:

- **Verfärbungen** – gelblich, bräunlich oder weißlich
- **Verdickung** des Nagels
- **Brüchigkeit** – der Nagel bröckelt am Rand
- **Ablösung** vom Nagelbett
- Unangenehmer **Geruch** in fortgeschrittenen Fällen

## Risikofaktoren

Bestimmte Faktoren erhöhen das Risiko:

- Durchblutungsstörungen und Diabetes
- Häufiges Schwimmbad- oder Saunabesuche
- Fußschweiß und enge Schuhe
- Geschwächtes Immunsystem
- Höheres Alter

## Behandlungsmöglichkeiten

### Medizinische Nagelpflege
Professionelles Abtragen der befallenen Nagelsubstanz, um Antimykotika besser wirken zu lassen.

### Plasmatherapie
Innovative Behandlung mit Kaltplasma – antimikrobiell und durchblutungsfördernd. Besonders effektiv bei therapieresistentem Pilzbefall.

### Lokale Antimykotika
Spezielle Lacke und Cremes, die direkt auf den betroffenen Nagel aufgetragen werden.

## Vorbeugung

- Füße immer gut trocknen, besonders zwischen den Zehen
- In Schwimmbädern Badeschuhe tragen
- Atmungsaktive Schuhe und Socken wählen
- Eigene Nagelschere verwenden
- Regelmäßige podologische Kontrolle

## Wann zum Podologen?

Je früher Nagelpilz behandelt wird, desto besser die Heilungschancen. Vereinbaren Sie einen Termin bei ersten Anzeichen.`,
      },
      en: {
        title: "Recognizing and Treating Nail Fungus – What Really Helps",
        metaDescription:
          "Nail fungus on your foot? Learn how to recognize nail fungus early and which treatment methods really work.",
        category: "Treatments",
        readTime: "6 min.",
        excerpt:
          "Nail fungus affects one in five adults. When detected early, it can be treated effectively – with the right method.",
        content: `## Recognizing Nail Fungus

Nail fungus (onychomycosis) typically presents with:

- **Discoloration** – yellowish, brownish, or whitish
- **Thickening** of the nail
- **Brittleness** – the nail crumbles at the edges
- **Detachment** from the nail bed
- Unpleasant **odor** in advanced cases

## Risk Factors

Certain factors increase the risk:

- Circulatory disorders and diabetes
- Frequent visits to swimming pools or saunas
- Foot perspiration and tight shoes
- Weakened immune system
- Advanced age

## Treatment Options

### Medical Nail Care
Professional removal of the affected nail substance to allow antifungal agents to work more effectively.

### Plasma Therapy
Innovative treatment with cold plasma – antimicrobial and circulation-promoting. Particularly effective for therapy-resistant fungal infections.

### Topical Antifungals
Specialized lacquers and creams applied directly to the affected nail.

## Prevention

- Always dry your feet thoroughly, especially between the toes
- Wear shower shoes at swimming pools
- Choose breathable shoes and socks
- Use your own nail scissors
- Regular podological check-ups

## When to See a Podiatrist?

The earlier nail fungus is treated, the better the chances of recovery. Schedule an appointment at the first signs.`,
      },
      ru: {
        title: "Грибок ногтей: как распознать и вылечить – что действительно помогает",
        metaDescription:
          "Грибок ногтей на ноге? Узнайте, как распознать грибок ногтей на ранней стадии и какие методы лечения действительно помогают.",
        category: "Процедуры",
        readTime: "6 мин.",
        excerpt:
          "Грибок ногтей поражает каждого пятого взрослого. При раннем обнаружении его можно эффективно лечить – правильным методом.",
        content: `## Как распознать грибок ногтей

Грибок ногтей (онихомикоз) обычно проявляется следующими признаками:

- **Изменение цвета** – желтоватый, коричневатый или белесый
- **Утолщение** ногтя
- **Хрупкость** – ноготь крошится по краям
- **Отслоение** от ногтевого ложа
- Неприятный **запах** в запущенных случаях

## Факторы риска

Определённые факторы повышают риск:

- Нарушения кровообращения и диабет
- Частое посещение бассейнов или саун
- Потливость ног и тесная обувь
- Ослабленная иммунная система
- Пожилой возраст

## Методы лечения

### Медицинский уход за ногтями
Профессиональное удаление поражённой части ногтя для более эффективного воздействия противогрибковых препаратов.

### Плазменная терапия
Инновационное лечение холодной плазмой – антимикробное и стимулирующее кровообращение. Особенно эффективно при устойчивых к терапии грибковых инфекциях.

### Местные противогрибковые средства
Специальные лаки и кремы, наносимые непосредственно на поражённый ноготь.

## Профилактика

- Всегда тщательно вытирайте ноги, особенно между пальцами
- Носите тапочки в бассейнах
- Выбирайте дышащую обувь и носки
- Пользуйтесь собственными маникюрными ножницами
- Регулярно посещайте подолога

## Когда обращаться к подологу?

Чем раньше начато лечение грибка ногтей, тем выше шансы на выздоровление. Запишитесь на приём при первых признаках.`,
      },
    },
  },
  {
    slug: "diabetischer-fuss-vorsorge",
    date: "2026-02-10",
    image: blog3,
    translations: {
      de: {
        title: "Diabetischer Fuß – Warum Vorsorge Leben retten kann",
        metaDescription:
          "Das diabetische Fußsyndrom ist eine der häufigsten Komplikationen bei Diabetes. Erfahren Sie, wie podologische Vorsorge schützt.",
        category: "Prävention",
        readTime: "7 Min.",
        excerpt:
          "Rund 250.000 Menschen in Deutschland leiden am diabetischen Fußsyndrom. Regelmäßige Podologie kann schwere Komplikationen verhindern.",
        content: `## Was ist das diabetische Fußsyndrom?

Das diabetische Fußsyndrom (DFS) ist eine der schwerwiegendsten Komplikationen bei Diabetes mellitus. Durch Nervenschäden (Neuropathie) und Durchblutungsstörungen (Angiopathie) verlieren Betroffene das Schmerzempfinden an den Füßen.

## Warum ist das gefährlich?

Ohne Schmerzempfinden bleiben Verletzungen oft unbemerkt:

- Kleine Wunden werden nicht wahrgenommen
- Druckstellen entwickeln sich zu offenen Geschwüren
- Infektionen breiten sich schnell aus
- Im schlimmsten Fall droht eine Amputation

**Jährlich werden in Deutschland rund 50.000 Amputationen durchgeführt, die meisten bei Diabetikern.**

## Wie schützt Podologie?

Regelmäßige podologische Behandlung bei Diabetes umfasst:

1. **Sorgfältige Inspektion** – jeden Termin mit Fußuntersuchung
2. **Atraumatische Nagelpflege** – verletzungsfrei mit speziellen Instrumenten
3. **Hornhautbehandlung** – Vermeidung von Druckstellen
4. **Wundprävention** – frühzeitiges Erkennen von Risikobereichen
5. **Beratung** – tägliche Fußpflege und passendes Schuhwerk

## Kassenleistung bei Diabetes

Bei diagnostiziertem diabetischen Fußsyndrom (DFS) übernimmt die Krankenkasse die Kosten für podologische Behandlungen. Ihr Arzt stellt eine Heilmittelverordnung aus. Unsere Praxis ist kassenzugelassen und auf diabetische Fußpflege spezialisiert.

## Tipps für den Alltag

- Füße täglich auf Veränderungen kontrollieren
- Lauwarmes Wasser zum Waschen (Temperatur testen!)
- Füße gut eincremen, aber nicht zwischen den Zehen
- Bequeme, gut sitzende Schuhe tragen
- Nie barfuß laufen
- Regelmäßige Termine beim Podologen wahrnehmen`,
      },
      en: {
        title: "Diabetic Foot – Why Prevention Can Save Lives",
        metaDescription:
          "Diabetic foot syndrome is one of the most common complications of diabetes. Learn how podological prevention provides protection.",
        category: "Prevention",
        readTime: "7 min.",
        excerpt:
          "Around 250,000 people in Germany suffer from diabetic foot syndrome. Regular podology can prevent serious complications.",
        content: `## What Is Diabetic Foot Syndrome?

Diabetic foot syndrome (DFS) is one of the most serious complications of diabetes mellitus. Due to nerve damage (neuropathy) and circulatory disorders (angiopathy), affected individuals lose pain sensation in their feet.

## Why Is This Dangerous?

Without pain sensation, injuries often go unnoticed:

- Small wounds are not perceived
- Pressure points develop into open ulcers
- Infections spread rapidly
- In the worst case, amputation may be necessary

**Approximately 50,000 amputations are performed annually in Germany, most of them on diabetic patients.**

## How Does Podology Protect?

Regular podological treatment for diabetes includes:

1. **Careful inspection** – foot examination at every appointment
2. **Atraumatic nail care** – injury-free with specialized instruments
3. **Callus treatment** – preventing pressure points
4. **Wound prevention** – early detection of risk areas
5. **Counseling** – daily foot care and appropriate footwear

## Insurance Coverage for Diabetes

When diabetic foot syndrome (DFS) has been diagnosed, health insurance covers the costs of podological treatments. Your doctor issues a therapeutic prescription. Our practice is insurance-approved and specialized in diabetic foot care.

## Everyday Tips

- Check your feet daily for changes
- Use lukewarm water for washing (test the temperature!)
- Moisturize your feet well, but not between the toes
- Wear comfortable, well-fitting shoes
- Never walk barefoot
- Attend regular appointments with your podiatrist`,
      },
      ru: {
        title: "Диабетическая стопа – почему профилактика может спасти жизнь",
        metaDescription:
          "Синдром диабетической стопы – одно из самых частых осложнений диабета. Узнайте, как подологическая профилактика защищает.",
        category: "Профилактика",
        readTime: "7 мин.",
        excerpt:
          "Около 250 000 человек в Германии страдают синдромом диабетической стопы. Регулярная подология может предотвратить серьёзные осложнения.",
        content: `## Что такое синдром диабетической стопы?

Синдром диабетической стопы (СДС) – одно из самых тяжёлых осложнений сахарного диабета. Из-за повреждения нервов (нейропатия) и нарушений кровообращения (ангиопатия) пациенты теряют болевую чувствительность в стопах.

## Почему это опасно?

Без болевой чувствительности травмы часто остаются незамеченными:

- Мелкие раны не ощущаются
- Точки давления перерастают в открытые язвы
- Инфекции быстро распространяются
- В худшем случае может потребоваться ампутация

**Ежегодно в Германии проводится около 50 000 ампутаций, большинство из которых – у пациентов с диабетом.**

## Как подология защищает?

Регулярное подологическое лечение при диабете включает:

1. **Тщательный осмотр** – обследование стоп при каждом визите
2. **Атравматический уход за ногтями** – безопасная обработка специальными инструментами
3. **Обработка мозолей** – предотвращение образования точек давления
4. **Профилактика ран** – раннее обнаружение зон риска
5. **Консультирование** – ежедневный уход за стопами и подбор обуви

## Покрытие страховкой при диабете

При диагностированном синдроме диабетической стопы (СДС) больничная касса покрывает расходы на подологическое лечение. Ваш врач выписывает направление на лечебные процедуры. Наша практика имеет допуск к работе с больничными кассами и специализируется на уходе за диабетической стопой.

## Советы на каждый день

- Ежедневно проверяйте ноги на предмет изменений
- Используйте тёплую воду для мытья (проверяйте температуру!)
- Хорошо увлажняйте стопы, но не между пальцами
- Носите удобную, хорошо сидящую обувь
- Никогда не ходите босиком
- Регулярно посещайте подолога`,
      },
    },
  },
  {
    slug: "eingewachsener-nagel-was-tun",
    date: "2026-02-20",
    image: blog4,
    translations: {
      de: {
        title: "Eingewachsener Zehennagel – Was tun? Ursachen & Behandlung",
        metaDescription:
          "Ein eingewachsener Nagel schmerzt bei jedem Schritt. Erfahren Sie die Ursachen und wie der Podologe schmerzfrei behandelt.",
        category: "Behandlungen",
        readTime: "5 Min.",
        excerpt:
          "Ein eingewachsener Zehennagel gehört zu den häufigsten Gründen für einen Podologen-Besuch. Moderne Methoden machen die Behandlung schmerzfrei.",
        content: `## Was ist ein eingewachsener Nagel?

Ein eingewachsener Zehennagel (Unguis incarnatus) entsteht, wenn sich der seitliche Nagelrand in das umliegende Gewebe drückt. Meist ist der große Zeh betroffen.

## Häufige Ursachen

- **Falsches Schneiden** – zu kurz oder zu rund geschnitten
- **Enge Schuhe** – Druck auf die Zehen
- **Genetische Veranlagung** – Nagelform und -wachstum
- **Verletzungen** – Stoß gegen den Zeh
- **Schwitzende Füße** – weichen das Gewebe auf

## Symptome

- Schmerzen am seitlichen Nagelrand
- Rötung und Schwellung
- Wildes Fleisch (Granulationsgewebe)
- Im fortgeschrittenen Stadium: Eiterung

## Behandlung beim Podologen

### Tamponade
Bei leichten Fällen wird eine spezielle Tamponade zwischen Nagel und Hautfalte eingelegt, um den Nagel anzuheben.

### Nagelkorrekturspange
Bei wiederkehrenden Problemen setzen wir Korrekturspangen ein (z.B. 3TO, VHO). Diese werden schmerzfrei auf den Nagel geklebt und korrigieren die Wachstumsrichtung über Wochen bis Monate.

### Orthonyxie
Die Spangentherapie ist die eleganteste Lösung: Der Nagel wird sanft in die richtige Form geführt, ohne operativen Eingriff.

## Vorbeugung

- Nägel gerade schneiden, Ecken leicht abrunden
- Passende Schuhe tragen
- Füße regelmäßig pflegen
- Bei ersten Anzeichen zum Podologen

## Kostenübernahme

Nagelkorrektur und Orthonyxie können bei medizinischer Indikation als Kassenleistung verordnet werden.`,
      },
      en: {
        title: "Ingrown Toenail – What to Do? Causes & Treatment",
        metaDescription:
          "An ingrown toenail causes pain with every step. Learn about the causes and how a podiatrist can provide pain-free treatment.",
        category: "Treatments",
        readTime: "5 min.",
        excerpt:
          "An ingrown toenail is one of the most common reasons for visiting a podiatrist. Modern methods make the treatment pain-free.",
        content: `## What Is an Ingrown Toenail?

An ingrown toenail (unguis incarnatus) occurs when the lateral nail edge presses into the surrounding tissue. The big toe is most commonly affected.

## Common Causes

- **Incorrect cutting** – cut too short or too round
- **Tight shoes** – pressure on the toes
- **Genetic predisposition** – nail shape and growth
- **Injuries** – stubbing the toe
- **Sweaty feet** – softening the tissue

## Symptoms

- Pain along the lateral nail edge
- Redness and swelling
- Proud flesh (granulation tissue)
- In advanced stages: suppuration

## Treatment by a Podiatrist

### Tamponade
In mild cases, a special tamponade is placed between the nail and skin fold to lift the nail.

### Nail Correction Brace
For recurring problems, we use correction braces (e.g., 3TO, VHO). These are painlessly bonded to the nail and correct the growth direction over weeks to months.

### Orthonyxia
Brace therapy is the most elegant solution: the nail is gently guided into the correct shape without surgical intervention.

## Prevention

- Cut nails straight across, slightly rounding the corners
- Wear properly fitting shoes
- Care for your feet regularly
- See a podiatrist at the first signs

## Cost Coverage

Nail correction and orthonyxia can be prescribed as an insurance-covered service when medically indicated.`,
      },
      ru: {
        title: "Вросший ноготь – что делать? Причины и лечение",
        metaDescription:
          "Вросший ноготь причиняет боль при каждом шаге. Узнайте о причинах и о том, как подолог проводит безболезненное лечение.",
        category: "Процедуры",
        readTime: "5 мин.",
        excerpt:
          "Вросший ноготь – одна из самых частых причин обращения к подологу. Современные методы делают лечение безболезненным.",
        content: `## Что такое вросший ноготь?

Вросший ноготь (Unguis incarnatus) возникает, когда боковой край ногтя врезается в окружающие ткани. Чаще всего поражается большой палец ноги.

## Частые причины

- **Неправильная стрижка** – слишком короткая или закруглённая
- **Тесная обувь** – давление на пальцы
- **Генетическая предрасположенность** – форма и рост ногтя
- **Травмы** – удар пальцем ноги
- **Потливость ног** – размягчение тканей

## Симптомы

- Боль по краю ногтя
- Покраснение и отёк
- Дикое мясо (грануляционная ткань)
- На поздних стадиях: нагноение

## Лечение у подолога

### Тампонада
В лёгких случаях между ноготь и кожную складку устанавливается специальная тампонада для приподнимания ногтя.

### Корректирующая скоба
При повторяющихся проблемах мы используем корректирующие скобы (например, 3TO, VHO). Они безболезненно приклеиваются к ногтю и исправляют направление роста в течение недель или месяцев.

### Ортониксия
Скобяная терапия – наиболее элегантное решение: ноготь мягко направляется в правильную форму без хирургического вмешательства.

## Профилактика

- Стригите ногти ровно, слегка закругляя углы
- Носите подходящую обувь
- Регулярно ухаживайте за стопами
- При первых признаках обратитесь к подологу

## Покрытие расходов

Коррекция ногтей и ортониксия могут быть назначены как услуга, покрываемая страховкой, при наличии медицинских показаний.`,
      },
    },
  },
  {
    slug: "warzen-kryotherapie",
    date: "2026-03-01",
    image: blog5,
    translations: {
      de: {
        title: "Warzen am Fuß – So hilft Kryotherapie",
        metaDescription:
          "Dornwarzen am Fuß sind hartnäckig und schmerzhaft. Erfahren Sie, wie Kryotherapie (Vereisung) effektiv hilft.",
        category: "Behandlungen",
        readTime: "4 Min.",
        excerpt:
          "Dornwarzen (Verrucae plantares) können jeden Schritt zur Qual machen. Die Kryotherapie bietet eine effektive, schnelle Behandlung.",
        content: `## Was sind Dornwarzen?

Dornwarzen (Verrucae plantares) werden durch humane Papillomviren (HPV) verursacht. Sie wachsen durch den Druck beim Gehen nach innen und verursachen stechende Schmerzen.

## Warum sind Fußwarzen so hartnäckig?

- Die Hornschicht am Fuß ist dick – Wirkstoffe dringen schlecht ein
- Das feucht-warme Milieu im Schuh begünstigt das Virus
- Dornwarzen wachsen tief ins Gewebe hinein
- Selbstbehandlung erreicht oft nicht die Wurzel

## So funktioniert Kryotherapie

Bei der Kryotherapie wird flüssiger Stickstoff (-196°C) gezielt auf die Warze aufgebracht:

1. **Reinigung** des betroffenen Bereichs
2. **Kontrollierte Vereisung** für wenige Sekunden
3. Das Gewebe **bildet eine Blase** und stößt die Warze ab
4. Gesundes Gewebe wächst nach

### Vorteile der Kryotherapie

- Schnelle Behandlung (wenige Minuten)
- Kein Schneiden nötig
- Geringe Narbenbildung
- Hohe Erfolgsquote

### Was Sie danach beachten sollten

- Die Blase nicht aufstechen
- Füße sauber und trocken halten
- In öffentlichen Bereichen Badeschuhe tragen
- Folgetermin wahrnehmen (oft 2-3 Sitzungen nötig)

## Prävention

- In Schwimmbädern und Duschen immer Badeschuhe tragen
- Füße täglich waschen und gut trocknen
- Immunsystem stärken
- Bei Veränderungen frühzeitig zum Podologen`,
      },
      en: {
        title: "Warts on the Foot – How Cryotherapy Helps",
        metaDescription:
          "Plantar warts on the foot are stubborn and painful. Learn how cryotherapy (freezing) effectively helps.",
        category: "Treatments",
        readTime: "4 min.",
        excerpt:
          "Plantar warts (verrucae plantares) can make every step agonizing. Cryotherapy offers an effective, fast treatment.",
        content: `## What Are Plantar Warts?

Plantar warts (verrucae plantares) are caused by human papillomaviruses (HPV). Due to the pressure from walking, they grow inward and cause stabbing pain.

## Why Are Foot Warts So Stubborn?

- The horny layer on the foot is thick – active ingredients penetrate poorly
- The moist, warm environment inside shoes favors the virus
- Plantar warts grow deep into the tissue
- Self-treatment often fails to reach the root

## How Cryotherapy Works

During cryotherapy, liquid nitrogen (-196°C) is applied precisely to the wart:

1. **Cleaning** of the affected area
2. **Controlled freezing** for a few seconds
3. The tissue **forms a blister** and sheds the wart
4. Healthy tissue grows back

### Advantages of Cryotherapy

- Quick treatment (a few minutes)
- No cutting required
- Minimal scarring
- High success rate

### What to Keep in Mind Afterwards

- Do not puncture the blister
- Keep feet clean and dry
- Wear shower shoes in public areas
- Attend the follow-up appointment (often 2–3 sessions needed)

## Prevention

- Always wear shower shoes in swimming pools and showers
- Wash feet daily and dry them thoroughly
- Strengthen your immune system
- See a podiatrist early when you notice changes`,
      },
      ru: {
        title: "Бородавки на стопе – как помогает криотерапия",
        metaDescription:
          "Подошвенные бородавки упорны и болезненны. Узнайте, как криотерапия (замораживание) эффективно помогает.",
        category: "Процедуры",
        readTime: "4 мин.",
        excerpt:
          "Подошвенные бородавки (Verrucae plantares) могут превращать каждый шаг в мучение. Криотерапия предлагает эффективное и быстрое лечение.",
        content: `## Что такое подошвенные бородавки?

Подошвенные бородавки (Verrucae plantares) вызываются вирусом папилломы человека (ВПЧ). Из-за давления при ходьбе они растут внутрь и вызывают колющую боль.

## Почему бородавки на стопе так трудно вывести?

- Роговой слой на стопе толстый – активные вещества плохо проникают
- Влажная тёплая среда в обуви способствует развитию вируса
- Подошвенные бородавки растут глубоко в ткань
- Самолечение часто не достигает корня

## Как работает криотерапия

При криотерапии жидкий азот (-196°C) целенаправленно наносится на бородавку:

1. **Очищение** поражённого участка
2. **Контролируемое замораживание** на несколько секунд
3. Ткань **образует пузырь** и отторгает бородавку
4. Здоровая ткань нарастает заново

### Преимущества криотерапии

- Быстрая процедура (несколько минут)
- Не требуется разрезов
- Минимальное рубцевание
- Высокий процент успеха

### Что следует учесть после процедуры

- Не прокалывайте пузырь
- Держите ноги чистыми и сухими
- Носите тапочки в общественных местах
- Посетите контрольный приём (часто требуется 2–3 сеанса)

## Профилактика

- Всегда носите тапочки в бассейнах и душевых
- Мойте ноги ежедневно и тщательно вытирайте
- Укрепляйте иммунную систему
- При изменениях своевременно обращайтесь к подологу`,
      },
    },
  },
  {
    slug: "fusspflege-im-winter",
    date: "2025-12-05",
    image: blog6,
    translations: {
      de: {
        title: "Fußpflege im Winter – 7 Tipps für gesunde Füße",
        metaDescription:
          "Im Winter leiden unsere Füße besonders. 7 Profi-Tipps vom Podologen für gepflegte und gesunde Füße in der kalten Jahreszeit.",
        category: "Prävention",
        readTime: "4 Min.",
        excerpt:
          "Trockene Heizungsluft, dicke Socken, wenig Aufmerksamkeit – im Winter brauchen unsere Füße besondere Pflege.",
        content: `## Warum Füße im Winter leiden

In der kalten Jahreszeit stecken unsere Füße den ganzen Tag in geschlossenen Schuhen. Heizungsluft trocknet die Haut aus, und die Durchblutung ist durch Kälte reduziert. Die Folge: Risse, Hornhaut, eingewachsene Nägel.

## 7 Tipps vom Podologen

### 1. Regelmäßig eincremen
Verwenden Sie eine reichhaltige Fußcreme mit Urea (10-15%). Tragen Sie sie abends auf und ziehen Sie Baumwollsocken darüber. Die Haut nimmt die Feuchtigkeit über Nacht optimal auf.

### 2. Fußbäder richtig machen
Maximal 10 Minuten in lauwarmem Wasser (35-37°C). Zu heißes Wasser trocknet die Haut zusätzlich aus. Danach gründlich abtrocknen, besonders zwischen den Zehen.

### 3. Hornhaut sanft entfernen
Verwenden Sie eine Fußfeile statt Hornhauthobel. Behandeln Sie nur leichte Verhornungen selbst – bei starker Hornhaut lieber zum Podologen.

### 4. Nägel richtig schneiden
Gerade schneiden, Ecken nur leicht abrunden. Nicht zu kurz! Der Nagel sollte die Zehenkuppe abdecken.

### 5. Passende Schuhe wählen
Winterschuhe dürfen nicht drücken. Achten Sie auf ausreichend Platz für die Zehen und atmungsaktive Materialien.

### 6. Füße warmhalten
Kalte Füße bedeuten schlechte Durchblutung. Wollsocken, Einlegesohlen und regelmäßige Bewegung helfen.

### 7. Regelmäßig zum Podologen
Gerade im Winter lohnt sich ein professioneller Check. Wir erkennen Probleme frühzeitig und behandeln sie, bevor sie schlimmer werden.

## Besonders wichtig für Diabetiker

Wenn Sie Diabetes haben, sollten Sie Ihre Füße im Winter besonders sorgfältig kontrollieren. Durch die eingeschränkte Sensibilität bemerken Sie Druckstellen und Verletzungen möglicherweise nicht. Vereinbaren Sie regelmäßige Podologie-Termine.`,
      },
      en: {
        title: "Foot Care in Winter – 7 Tips for Healthy Feet",
        metaDescription:
          "Our feet suffer especially in winter. 7 professional tips from a podiatrist for well-groomed and healthy feet during the cold season.",
        category: "Prevention",
        readTime: "4 min.",
        excerpt:
          "Dry heating air, thick socks, little attention – in winter, our feet need special care.",
        content: `## Why Feet Suffer in Winter

During the cold season, our feet spend all day in closed shoes. Heating air dries out the skin, and circulation is reduced by the cold. The result: cracks, calluses, ingrown nails.

## 7 Tips From a Podiatrist

### 1. Moisturize Regularly
Use a rich foot cream with urea (10–15%). Apply it in the evening and put on cotton socks over it. The skin absorbs the moisture optimally overnight.

### 2. Take Foot Baths Properly
No longer than 10 minutes in lukewarm water (35–37°C). Water that is too hot dries out the skin even more. Afterwards, dry thoroughly, especially between the toes.

### 3. Remove Calluses Gently
Use a foot file instead of a callus plane. Only treat light calluses yourself – for heavy calluses, it is better to see a podiatrist.

### 4. Cut Nails Correctly
Cut straight across, only slightly rounding the corners. Not too short! The nail should cover the tip of the toe.

### 5. Choose Proper Footwear
Winter shoes should not pinch. Make sure there is enough room for the toes and choose breathable materials.

### 6. Keep Feet Warm
Cold feet mean poor circulation. Wool socks, insoles, and regular movement help.

### 7. Visit Your Podiatrist Regularly
Especially in winter, a professional check-up is worthwhile. We detect problems early and treat them before they get worse.

## Especially Important for Diabetics

If you have diabetes, you should check your feet especially carefully in winter. Due to reduced sensitivity, you may not notice pressure points and injuries. Schedule regular podology appointments.`,
      },
      ru: {
        title: "Уход за ногами зимой – 7 советов для здоровых стоп",
        metaDescription:
          "Зимой наши ноги страдают особенно. 7 профессиональных советов от подолога для ухоженных и здоровых стоп в холодное время года.",
        category: "Профилактика",
        readTime: "4 мин.",
        excerpt:
          "Сухой воздух от отопления, толстые носки, мало внимания – зимой наши ноги нуждаются в особом уходе.",
        content: `## Почему ноги страдают зимой

В холодное время года наши ноги весь день находятся в закрытой обуви. Воздух от отопления сушит кожу, а кровообращение снижается из-за холода. Результат: трещины, мозоли, вросшие ногти.

## 7 советов от подолога

### 1. Регулярно увлажняйте
Используйте питательный крем для ног с мочевиной (10–15%). Наносите его вечером и надевайте сверху хлопковые носки. За ночь кожа оптимально впитает влагу.

### 2. Правильные ножные ванны
Не дольше 10 минут в тёплой воде (35–37°C). Слишком горячая вода дополнительно сушит кожу. После этого тщательно вытрите ноги, особенно между пальцами.

### 3. Бережно удаляйте мозоли
Используйте пилку для ног вместо лезвия. Обрабатывайте сами только лёгкие ороговения – при сильных мозолях лучше обратиться к подологу.

### 4. Правильно стригите ногти
Стригите ровно, слегка закругляя углы. Не слишком коротко! Ноготь должен закрывать кончик пальца.

### 5. Выбирайте подходящую обувь
Зимняя обувь не должна жать. Следите за достаточным пространством для пальцев и дышащими материалами.

### 6. Держите ноги в тепле
Холодные ноги означают плохое кровообращение. Помогут шерстяные носки, стельки и регулярная физическая активность.

### 7. Регулярно посещайте подолога
Особенно зимой стоит пройти профессиональный осмотр. Мы выявляем проблемы на ранней стадии и лечим их до того, как они усугубятся.

## Особенно важно для диабетиков

Если у вас диабет, зимой следует особенно тщательно контролировать состояние стоп. Из-за сниженной чувствительности вы можете не заметить точки давления и повреждения. Запишитесь на регулярные приёмы к подологу.`,
      },
    },
  },
  {
    slug: "krankenkasse-podologie",
    date: "2026-02-05",
    image: blog7,
    translations: {
      de: {
        title: "Podologie & Krankenkasse – Wann zahlt die Kasse?",
        metaDescription:
          "Wann übernimmt die Krankenkasse die Kosten für Podologie? Alles zu Verordnung, Zuzahlung und kassenzugelassener Praxis.",
        category: "Krankenkasse",
        readTime: "5 Min.",
        excerpt:
          "Viele wissen nicht: Podologische Behandlungen können von der Krankenkasse übernommen werden. Wir erklären, wie es funktioniert.",
        content: `## Podologie als Kassenleistung

Podologische Behandlungen gehören zu den Heilmitteln und können bei medizinischer Notwendigkeit von den gesetzlichen Krankenkassen übernommen werden – ähnlich wie Physiotherapie oder Ergotherapie.

## Voraussetzungen für die Kostenübernahme

### 1. Ärztliche Verordnung
Ihr Hausarzt, Diabetologe oder Dermatologe stellt eine Heilmittelverordnung (Muster 13) aus. Darauf steht die Diagnose und die verordnete Behandlung.

### 2. Kassenzugelassene Praxis
Die Behandlung muss in einer kassenzugelassenen Podologie-Praxis stattfinden. **Healthy Feet ist kassenzugelassen.**

### 3. Medizinische Indikation
Häufige Diagnosen, bei denen die Kasse zahlt:

- **Diabetisches Fußsyndrom** (DFS)
- **Eingewachsene Nägel** (Unguis incarnatus)
- **Nageldeformitäten** bei Grunderkrankungen
- **Hornhaut/Hühneraugen** bei Risikoerkrankungen
- **Chronische Wunden** am Fuß

## Was wird bezahlt?

- Podologische Komplexbehandlung
- Nagelkorrektur / Orthonyxie
- Hornhautabtragung
- Behandlung eingewachsener Nägel

## Zuzahlung

Gesetzlich Versicherte ab 18 Jahren zahlen eine Zuzahlung von 10% der Behandlungskosten plus 10 € je Verordnung. Kinder und Jugendliche unter 18 sind davon befreit. Bei Härtefallregelungen kann eine Befreiung beantragt werden.

## So kommen Sie zu Ihrem Termin

1. Sprechen Sie Ihren Arzt auf eine podologische Verordnung an
2. Bringen Sie die Verordnung und Ihre Versichertenkarte mit
3. Vereinbaren Sie einen Termin bei uns
4. Wir rechnen direkt mit Ihrer Krankenkasse ab

## Privatleistungen

Behandlungen ohne Verordnung (z.B. Plasmatherapie, kosmetische Fußpflege, Kryotherapie) sind Privatleistungen. Wir beraten Sie gerne zu den Kosten.`,
      },
      en: {
        title: "Podology & Health Insurance – When Does Insurance Cover It?",
        metaDescription:
          "When does health insurance cover the costs of podology? Everything about prescriptions, co-payments, and insurance-approved practices.",
        category: "Insurance",
        readTime: "5 min.",
        excerpt:
          "Many people don't know: podological treatments can be covered by health insurance. We explain how it works.",
        content: `## Podology as an Insurance-Covered Service

Podological treatments are classified as therapeutic remedies and can be covered by statutory health insurance when medically necessary – similar to physiotherapy or occupational therapy.

## Requirements for Cost Coverage

### 1. Medical Prescription
Your general practitioner, diabetologist, or dermatologist issues a therapeutic prescription (Form 13). It includes the diagnosis and the prescribed treatment.

### 2. Insurance-Approved Practice
Treatment must take place at an insurance-approved podology practice. **Healthy Feet is insurance-approved.**

### 3. Medical Indication
Common diagnoses covered by insurance:

- **Diabetic foot syndrome** (DFS)
- **Ingrown nails** (unguis incarnatus)
- **Nail deformities** associated with underlying conditions
- **Calluses/corns** in patients with risk conditions
- **Chronic wounds** on the foot

## What Is Covered?

- Podological complex treatment
- Nail correction / orthonyxia
- Callus removal
- Treatment of ingrown nails

## Co-Payment

Statutory-insured patients aged 18 and older pay a co-payment of 10% of the treatment costs plus 10 EUR per prescription. Children and adolescents under 18 are exempt. Hardship exemptions can be applied for.

## How to Get Your Appointment

1. Ask your doctor about a podological prescription
2. Bring the prescription and your insurance card
3. Schedule an appointment with us
4. We bill your health insurance directly

## Private Services

Treatments without a prescription (e.g., plasma therapy, cosmetic foot care, cryotherapy) are private services. We are happy to advise you on the costs.`,
      },
      ru: {
        title: "Подология и медицинская страховка – когда покрывает страховка?",
        metaDescription:
          "Когда медицинская страховка покрывает расходы на подологию? Всё о направлениях, доплатах и аккредитованных практиках.",
        category: "Страховка",
        readTime: "5 мин.",
        excerpt:
          "Многие не знают: подологические процедуры могут быть покрыты медицинской страховкой. Мы объясняем, как это работает.",
        content: `## Подология как страховая услуга

Подологические процедуры относятся к лечебным средствам и при медицинской необходимости могут быть покрыты обязательным медицинским страхованием – аналогично физиотерапии или эрготерапии.

## Условия для покрытия расходов

### 1. Врачебное направление
Ваш семейный врач, диабетолог или дерматолог выписывает направление на лечебные процедуры (бланк 13). В нём указывается диагноз и назначенное лечение.

### 2. Аккредитованная практика
Лечение должно проходить в аккредитованной подологической практике. **Healthy Feet имеет аккредитацию.**

### 3. Медицинские показания
Распространённые диагнозы, при которых страховка покрывает расходы:

- **Синдром диабетической стопы** (СДС)
- **Вросшие ногти** (Unguis incarnatus)
- **Деформация ногтей** при основных заболеваниях
- **Мозоли/натоптыши** при заболеваниях из группы риска
- **Хронические раны** на стопе

## Что покрывается?

- Подологическая комплексная процедура
- Коррекция ногтей / ортониксия
- Удаление мозолей
- Лечение вросших ногтей

## Доплата

Застрахованные по обязательному страхованию пациенты от 18 лет оплачивают доплату в размере 10% от стоимости лечения плюс 10 евро за каждое направление. Дети и подростки до 18 лет освобождены от доплаты. При наличии тяжёлых жизненных обстоятельств можно подать заявление на освобождение.

## Как записаться на приём

1. Обратитесь к вашему врачу за направлением на подологию
2. Принесите направление и вашу страховую карту
3. Запишитесь на приём к нам
4. Мы проведём расчёт напрямую с вашей больничной кассой

## Частные услуги

Процедуры без направления (например, плазменная терапия, косметический уход за стопами, криотерапия) являются частными услугами. Мы с удовольствием проконсультируем вас по стоимости.`,
      },
    },
  },
  {
    slug: "komplexbehandlung-erklaert",
    date: "2026-03-03",
    image: blog8,
    translations: {
      de: {
        title: "Podologische Komplexbehandlung – Was steckt dahinter?",
        metaDescription:
          "Die podologische Komplexbehandlung ist die umfassendste Kassenleistung. Erfahren Sie, was dazu gehört und für wen sie geeignet ist.",
        category: "Behandlungen",
        readTime: "5 Min.",
        excerpt:
          "Die Komplexbehandlung vereint mehrere podologische Maßnahmen in einer Sitzung – und wird von der Krankenkasse übernommen.",
        content: `## Was ist die podologische Komplexbehandlung?

Die podologische Komplexbehandlung ist die umfassendste Behandlungsform in der Podologie. Sie vereint mehrere therapeutische Maßnahmen in einer Sitzung und ist als Heilmittel von den gesetzlichen Krankenkassen anerkannt.

## Was gehört dazu?

Eine Komplexbehandlung umfasst mindestens drei der folgenden Maßnahmen:

1. **Nagelbehandlung** – Kürzen, Schleifen, Fräsen pathologisch veränderter Nägel
2. **Hornhautabtragung** – Entfernung von Hornhaut, Hühneraugen, Schwielen
3. **Druckschutz** – Anbringen von Polsterungen und Entlastungen
4. **Wundversorgung** – bei vorhandenen Läsionen
5. **Nagelkorrektur** – bei eingewachsenen oder deformierten Nägeln

## Für wen ist sie gedacht?

Die Komplexbehandlung wird vor allem verordnet bei:

- **Diabetes mellitus** mit Fußkomplikationen
- **Neuropathie** (Nervenschäden)
- **Angiopathie** (Durchblutungsstörungen)
- **Rheumatischen Erkrankungen**
- **Querschnittlähmung**

## Ablauf einer Sitzung

### Befunderhebung
Zu Beginn untersuchen wir Ihre Füße gründlich: Hautzustand, Nägel, Durchblutung, Sensibilität.

### Behandlung
Basierend auf dem Befund führen wir die notwendigen Maßnahmen durch – schonend und mit sterilen Instrumenten.

### Dokumentation
Jede Behandlung wird sorgfältig dokumentiert, einschließlich Fotos bei Wunden. So können wir den Verlauf verfolgen und Ihrem Arzt berichten.

### Beratung
Zum Abschluss beraten wir Sie zur häuslichen Fußpflege und empfehlen ggf. passende Pflegeprodukte.

## Verordnung und Kosten

Ihr Arzt stellt eine Heilmittelverordnung (Muster 13) aus. Die Krankenkasse übernimmt die Kosten abzüglich der gesetzlichen Zuzahlung. Als kassenzugelassene Praxis rechnen wir direkt mit Ihrer Krankenkasse ab.`,
      },
      en: {
        title: "Podological Complex Treatment – What Is Behind It?",
        metaDescription:
          "The podological complex treatment is the most comprehensive insurance-covered service. Learn what it includes and who it is suitable for.",
        category: "Treatments",
        readTime: "5 min.",
        excerpt:
          "The complex treatment combines multiple podological measures in one session – and is covered by health insurance.",
        content: `## What Is Podological Complex Treatment?

Podological complex treatment is the most comprehensive form of treatment in podology. It combines multiple therapeutic measures in one session and is recognized as a therapeutic remedy by statutory health insurance.

## What Does It Include?

A complex treatment includes at least three of the following measures:

1. **Nail treatment** – shortening, grinding, and milling pathologically altered nails
2. **Callus removal** – removal of calluses, corns, and hard skin
3. **Pressure protection** – applying padding and offloading
4. **Wound care** – for existing lesions
5. **Nail correction** – for ingrown or deformed nails

## Who Is It Intended For?

Complex treatment is primarily prescribed for:

- **Diabetes mellitus** with foot complications
- **Neuropathy** (nerve damage)
- **Angiopathy** (circulatory disorders)
- **Rheumatic diseases**
- **Paraplegia**

## How a Session Works

### Assessment
At the beginning, we thoroughly examine your feet: skin condition, nails, circulation, and sensitivity.

### Treatment
Based on the assessment, we carry out the necessary measures – gently and with sterile instruments.

### Documentation
Every treatment is carefully documented, including photographs of wounds. This allows us to track progress and report to your physician.

### Counseling
At the end, we advise you on home foot care and recommend suitable care products if needed.

## Prescription and Costs

Your doctor issues a therapeutic prescription (Form 13). Health insurance covers the costs minus the statutory co-payment. As an insurance-approved practice, we bill your health insurance directly.`,
      },
      ru: {
        title: "Подологическая комплексная процедура – что за ней стоит?",
        metaDescription:
          "Подологическая комплексная процедура – самая полная услуга, покрываемая страховкой. Узнайте, что в неё входит и для кого она предназначена.",
        category: "Процедуры",
        readTime: "5 мин.",
        excerpt:
          "Комплексная процедура объединяет несколько подологических мероприятий в одном сеансе – и покрывается медицинской страховкой.",
        content: `## Что такое подологическая комплексная процедура?

Подологическая комплексная процедура – это наиболее полная форма лечения в подологии. Она объединяет несколько терапевтических мероприятий в одном сеансе и признана лечебным средством обязательным медицинским страхованием.

## Что в неё входит?

Комплексная процедура включает как минимум три из следующих мероприятий:

1. **Обработка ногтей** – укорачивание, шлифовка, фрезерование патологически изменённых ногтей
2. **Удаление мозолей** – удаление мозолей, натоптышей и огрубевшей кожи
3. **Защита от давления** – наложение прокладок и разгрузка
4. **Обработка ран** – при имеющихся повреждениях
5. **Коррекция ногтей** – при вросших или деформированных ногтях

## Для кого она предназначена?

Комплексная процедура назначается прежде всего при:

- **Сахарном диабете** с осложнениями на стопах
- **Нейропатии** (повреждение нервов)
- **Ангиопатии** (нарушения кровообращения)
- **Ревматических заболеваниях**
- **Параплегии**

## Как проходит сеанс

### Обследование
В начале мы тщательно обследуем ваши стопы: состояние кожи, ногти, кровообращение и чувствительность.

### Лечение
На основании обследования мы проводим необходимые мероприятия – бережно и стерильными инструментами.

### Документирование
Каждая процедура тщательно документируется, включая фотографии ран. Это позволяет нам отслеживать динамику и отчитываться перед вашим врачом.

### Консультация
В завершение мы консультируем вас по домашнему уходу за стопами и при необходимости рекомендуем подходящие средства ухода.

## Направление и стоимость

Ваш врач выписывает направление на лечебные процедуры (бланк 13). Страховка покрывает расходы за вычетом установленной законом доплаты. Как аккредитованная практика, мы проводим расчёт напрямую с вашей больничной кассой.`,
      },
    },
  },
];
