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

type Command =
  'stats' |
  'help' |
  'ping' |
  'catFact'|
  'catPic' |
  'quote' |
  'insult' |
  'bored' |
  'whatIs'
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
