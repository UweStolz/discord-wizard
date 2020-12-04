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

type Commands =
  'help' |
  'ping' |
  'cat-fact'|
  'cat-pic' |
  'quote' |
  'insult' |
  'bored' |
  'what-is'
;

interface ParsedInput {
    command: Commands | null,
    argument: string | null,
}
