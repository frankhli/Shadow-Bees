import { IsObject } from 'class-validator'

export class UpdateAvailabilityDto {
  @IsObject()
  availability: Record<string, {
    available: boolean
    slots?: Array<{
      start: string
      end: string
    }>
  }>
}
