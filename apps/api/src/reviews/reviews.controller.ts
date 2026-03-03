import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('guide/:guideId')
  async getGuideReviews(
    @Param('guideId') guideId: string,
    @Query('limit') limit?: string
  ) {
    return this.reviewsService.getGuideReviews(guideId, {
      limit: limit ? parseInt(limit) : 10
    })
  }

  @Get('guide/:guideId/stats')
  async getGuideReviewStats(@Param('guideId') guideId: string) {
    return this.reviewsService.getGuideReviewStats(guideId)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto)
  }

  @Post(':id/response')
  @UseGuards(JwtAuthGuard)
  async respondToReview(
    @Param('id') reviewId: string,
    @Body('guideId') guideId: string,
    @Body('response') response: string
  ) {
    return this.reviewsService.respondToReview(reviewId, guideId, response)
  }
}
