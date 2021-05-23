interface QuoteGardenResponseData {
  _id: string;
  quoteText: string;
  quoteAuthor: string;
  quoteGenre: string;
  __v: string;
}

interface QuoteGardenResponse {
      statusCode: 200;
      message: string;
      pagination: {
        currentPage: number;
        nextPage: number | null;
        totalPages: number;
      },
      totalQuotes: number;
      data: QuoteGardenResponseData[]
}

interface owlbotResponse {
    'definitions': [
        {
          'type': string,
          'definition': string,
          'example': string,
          'image_url': string,
          'emoji': string
        }
      ],
      'word': string,
      'pronunciation': string
}

interface XkdcComic {
  month: string,
  num: number,
  link: string,
  year: string,
  news: string,
  'safe_title': string,
  transcript: string,
  alt: string,
  img: string,
  title: string,
  day: string
}

type Command =
  'stats' |
  'help' |
  'ping' |
  'catFact'|
  'catPic' |
  'quote' |
  'insult' |
  'bored' |
  'whatIs' |
  'advice' |
  'xkdc'
;

interface ParsedInput {
    command: Command | null,
    argument: string | null,
}

interface Schema {
  table: string;
  columns: string[];
  datatypes: string[];
  values: Record<string, unknown>[];
}
