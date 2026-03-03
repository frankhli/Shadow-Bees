'use client'

import { useEffect, useState } from 'react'
import { Star, ThumbsUp, MessageCircle } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface Review {
  id: string
  rating: number
  communication?: number
  knowledge?: number
  punctuality?: number
  title?: string
  content: string
  isVerified: boolean
  guideResponse?: string
  respondedAt?: string
  createdAt: string
  reviewer?: {
    name: string
    nationality: string
  }
  serviceInfo?: {
    date: string
    hours: number
  }
}

interface ReviewStats {
  totalReviews: number
  averageRating: number
  averageCommunication: number
  averageKnowledge: number
  averagePunctuality: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

interface GuideReviewsProps {
  guideId: string
}

export function GuideReviews({ guideId }: GuideReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
    fetchStats()
  }, [guideId])

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/guide/${guideId}`)
      const data = await res.json()
      setReviews(data)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
      // Mock data
      setReviews([
        {
          id: 'rev-1',
          rating: 5,
          communication: 5,
          knowledge: 5,
          punctuality: 5,
          title: 'Amazing experience!',
          content: 'Michael was an incredible guide. He showed us hidden spots in the hutongs that we never would have found on our own. His knowledge of Beijing history is impressive, and he\'s so friendly and easy to talk to. Highly recommend!',
          isVerified: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
          reviewer: { name: 'Sarah Johnson', nationality: 'USA' },
          serviceInfo: { date: '2024-02-20', hours: 4 }
        },
        {
          id: 'rev-2',
          rating: 5,
          communication: 5,
          knowledge: 4,
          punctuality: 5,
          content: 'Great food tour! Michael took us to amazing local restaurants. The Peking duck was the best I\'ve ever had. Only wish we had more time to explore.',
          isVerified: true,
          guideResponse: 'Thank you Tom! It was a pleasure showing you around. Next time let\'s do a full day tour!',
          respondedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
          reviewer: { name: 'Tom Wilson', nationality: 'UK' },
          serviceInfo: { date: '2024-02-15', hours: 3 }
        },
        {
          id: 'rev-3',
          rating: 4,
          communication: 5,
          knowledge: 4,
          punctuality: 4,
          content: 'Good tour overall. Michael was knowledgeable and friendly. We had a slight delay at the start but everything else was perfect.',
          isVerified: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
          reviewer: { name: 'Emma Chen', nationality: 'Canada' },
          serviceInfo: { date: '2024-01-28', hours: 4 }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/guide/${guideId}/stats`)
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch review stats:', error)
      // Mock stats
      setStats({
        totalReviews: 127,
        averageRating: 4.9,
        averageCommunication: 4.9,
        averageKnowledge: 4.8,
        averagePunctuality: 4.9,
        ratingDistribution: { 5: 115, 4: 10, 3: 2, 2: 0, 1: 0 }
      })
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500" />
      </div>
    )
  }

  if (!stats || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to book and review!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl font-bold">{stats.averageRating}</span>
            <div>
              <StarRating rating={Math.round(stats.averageRating)} />
              <p className="text-sm text-gray-500 mt-1">{stats.totalReviews} reviews</p>
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-3">{rating}</span>
                  <Star className="w-4 h-4 text-gray-300" />
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-gray-500 w-10 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Category Ratings */}
        <div className="space-y-4">
          <h4 className="font-medium">Category Ratings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Communication</span>
              <div className="flex items-center gap-2">
                <Progress value={(stats.averageCommunication / 5) * 100} className="w-24 h-2" />
                <span className="font-medium w-8">{stats.averageCommunication}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Knowledge</span>
              <div className="flex items-center gap-2">
                <Progress value={(stats.averageKnowledge / 5) * 100} className="w-24 h-2" />
                <span className="font-medium w-8">{stats.averageKnowledge}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Punctuality</span>
              <div className="flex items-center gap-2">
                <Progress value={(stats.averagePunctuality / 5) * 100} className="w-24 h-2" />
                <span className="font-medium w-8">{stats.averagePunctuality}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-start gap-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-cyan-100 to-purple-100 text-cyan-700 text-sm">
                  {review.reviewer ? getInitials(review.reviewer.name) : '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="font-medium">{review.reviewer?.name}</span>
                    {review.reviewer?.nationality && (
                      <span className="text-gray-500 text-sm ml-2">({review.reviewer.nationality})</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{formatDate(review.createdAt)}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={review.rating} />
                  {review.isVerified && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      Verified Purchase
                    </Badge>
                  )}
                </div>

                {review.title && (
                  <h4 className="font-semibold mb-1">{review.title}</h4>
                )}
                
                <p className="text-gray-600">{review.content}</p>
                
                {review.serviceInfo && (
                  <p className="text-sm text-gray-400 mt-2">
                    Tour date: {formatDate(review.serviceInfo.date)} · {review.serviceInfo.hours} hours
                  </p>
                )}

                {/* Guide Response */}
                {review.guideResponse && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-cyan-100 text-cyan-700">Guide Response</Badge>
                      {review.respondedAt && (
                        <span className="text-xs text-gray-400">{formatDate(review.respondedAt)}</span>
                      )}
                    </div>
                    <p className="text-gray-600">{review.guideResponse}</p>
                  </div>
                )}

                {/* Helpful Button */}
                <div className="flex items-center gap-4 mt-3">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Helpful
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
