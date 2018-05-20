Feature: Game Play
As company that provides test automation services
We want to do a POC for Paryplay
In order to verify that we can automate most of the test cases

Background:
  Given "Games" page is open
  And "Atari Pong" game is started

  @debug
  Scenario: Reals are spining
    When I make a spin
    Then reals should start spining
    But spining should not last long

  Scenario: Check games settings
    When I open game settings
    Then I sould see game settgins:
    | home | sound | questions | cup |

  Scenario: Check balance updates after a spin
    Given spin bet is 2.00$
    And I memorize the current balance
    When I make a spin
    And the spin finishes
    Then balance should be increased by the win
    But balance should be decreased by 2.00$

  Scenario: Autobet play
    Given autobeting is set to 10 spins
    When I make a spin
    Then reals should spin 10 times

  Scenario: Autobet play
    When I do spins until a win
    Then correct win win is drawn
    And the win price is correct
    And balance should be increased by the win
